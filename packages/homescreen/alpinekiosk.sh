#!/bin/bash

set -ex

: ${BRANCH:=v3.21}
: ${MIRROR:=http://dl-cdn.alpinelinux.org/alpine}
: ${IMAGE_FILE:=$PWD/alpine-rpi-kiosk-$BRANCH.img}
: ${BASE_PACKAGES:="alpine-base binutils openssl dosfstools e2fsprogs nano busybox-mdev-openrc"}
: ${HW_PACKAGES:="linux-rpi linux-firmware-other raspberrypi-bootloader mesa mesa-dri-gallium mesa-gles ddcutil"}
: ${EXTRA_PACKAGES:="chrony agetty doas e2fsprogs-extra parted lsblk openssh ttf-dejavu xdg-dbus-proxy dbus fontconfig"}
: ${BROWSER_PACKAGES:="bubblewrap@edge cog@edge icu-data-full@edge wpewebkit@edge"}
: ${PACKAGES:=}
: ${KEYBOARD_LAYOUT:=us}
: ${KEYBOARD_VARIANT:=us}
: ${TIMEZONE:=Europe/Paris}
: ${ROOTPASS:=raspberry}
: ${USERNAME:=pi}
: ${USERPASS:=raspberry}
: ${IP_ADDRESS:=}
: ${RESOLUTION:=1440x900}
: ${HOME_URL:=https://home.dragon-angel.fr}
: ${ROOT_MNT:=$(mktemp -d)}
: ${ROOT_SIZE:=2G}
: ${COMPRESSOR:=xz -4f -T0}
: ${COMMANDS:=:}
: ${ARCH:=armv7}


setup_first_boot() {
	# Based on https://github.com/knoopx/alpine-raspberry-pi/blob/master/bootstrap/99-first-boot

	cat <<-'EOF' > "$ROOT_MNT"/boot/firstrun.sh
	#!/bin/sh
	set -xe

	ROOT_PARTITION=$(df -P / | tail -1 | cut -d' ' -f1)
	SYS_DISK="/dev/$(lsblk -ndo PKNAME $ROOT_PARTITION)"

	cat <<PARTED | parted ---pretend-input-tty $SYS_DISK
	unit %
	resizepart 2
	Yes
	100%
	PARTED

	partprobe
	resize2fs $ROOT_PARTITION
	rc-update del first-boot
	rm /etc/init.d/first-boot /boot/firstrun.sh
	echo -n " overlaytmpfs=yes" >> /boot/cmdline.txt

	reboot
	EOF

	cat <<-EOF > "$ROOT_MNT"/etc/init.d/first-boot
	#!/sbin/openrc-run
	command="/bin/sh"
	command_args="/boot/firstrun.sh"
	command_background=false
	depend() {
	    after modules
	    need localmount
	}
	EOF
}

setup_disk() {
	local boot_uuid=$(blkid -o value -s UUID "$BOOT_DEV")
	local root_uuid=$(blkid -o value -s UUID "$ROOT_DEV")

	cat <<-EOF > "$ROOT_MNT"/etc/fstab
	UUID=$root_uuid	/	ext4	rw,relatime 0 1
	UUID=$boot_uuid	/boot	vfat	rw,relatime,fmask=0022,dmask=0022,codepage=437,iocharset=ascii,shortname=mixed,errors=remount-ro 0 2
	/dev/cdrom	/media/cdrom	iso9660	noauto,ro 0 0
	/dev/usbdisk	/media/usb	vfat	noauto	0 0
	tmpfs	/tmp	tmpfs	nosuid,nodev	0	0
	EOF

	echo -n "root=UUID=$root_uuid modules=sd-mod,usb-storage,ext4 quiet rootfstype=ext4" > "$ROOT_MNT"/boot/cmdline.txt
}

setup_bootloader() {
	# Based on https://gitlab.alpinelinux.org/alpine/alpine-conf/-/blob/master/setup-disk.in
	cat <<-EOF > "$ROOT_MNT"/boot/config.txt
	# do not modify this file as it will be overwritten on upgrade.
	# create and/or modify usercfg.txt instead.
	# https://www.raspberrypi.com/documentation/computers/config_txt.html
	[pi2]
	kernel=vmlinuz-rpi
	initramfs initramfs-rpi
	[pi3]
	kernel=vmlinuz-rpi
	initramfs initramfs-rpi
	[pi3+]
	kernel=vmlinuz-rpi
	initramfs initramfs-rpi
	[pi4]
	enable_gic=1
	kernel=vmlinuz-rpi4
	initramfs initramfs-rpi4
	arm_64bit=1
	[pi5]
	enable_gic=1
	kernel=vmlinuz-rpi5
	initramfs initramfs-rpi5
	arm_64bit=1
	[all]
	include usercfg.txt
	EOF

	# Based on: https://wiki.alpinelinux.org/wiki/Raspberry_Pi#Enable_OpenGL_(Raspberry_Pi_3/4)
	cat <<-EOF >> "$ROOT_MNT"/boot/usercfg.txt
max_framebuffers=2
hdmi_force_hotplug=1
hdmi_group=2
hdmi_mode=16
gpu_mem=128

# Force the use of specific HDMI settings to avoid mismatches
hdmi_force_mode=1
dtoverlay=vc4-kms-v3d
dtparam=i2c_vc_on
disable_overscan=1
	EOF
}

setup_network() {
	# Based on https://wiki.alpinelinux.org/wiki/Configure_Networking#Ethernet_Configuration

	cat <<-EOF > "$ROOT_MNT"/etc/network/interfaces
	auto lo
	iface lo inet loopback

	auto eth0
	EOF

	if [ -z "$IP_ADDRESS" ]; then
		cat <<-EOF >> "$ROOT_MNT"/etc/network/interfaces
		iface eth0 inet dhcp
		EOF
	else
		cat <<-EOF >> "$ROOT_MNT"/etc/network/interfaces
		iface eth0 inet static
		        address ${IP_ADDRESS}/24
		        gateway ${IP_ADDRESS%.*}.1
		EOF

		cat <<-EOF >> "$ROOT_MNT"/etc/resolv.conf
		nameserver 8.8.8.8
		nameserver 8.8.4.4
		EOF
	fi
}

gen_setup_script() {
	cat <<-EOF
	#!/bin/sh

	set -ex

	echo "root:$ROOTPASS" | /usr/sbin/chpasswd

	# Create user
	adduser -D "$USERNAME"
	adduser "$USERNAME" video
	adduser "$USERNAME" input
	echo "$USERNAME:$USERPASS" | /usr/sbin/chpasswd

	# Raspberry Pi has no hardware clock
	rc-update add swclock boot
	rc-update del hwclock boot || true
	setup-ntp chrony || true

	setup-keymap $KEYBOARD_LAYOUT $KEYBOARD_VARIANT || true
	setup-timezone $TIMEZONE || true

	chmod +x /etc/init.d/first-boot
	rc-update add first-boot
	EOF
}
setup_repo() {
cat <<-EOF >> "$ROOT_MNT"/etc/apk/repositories
/media/mmcblk0p1/apks
http://dl-cdn.alpinelinux.org/alpine/$BRANCH/main
http://dl-cdn.alpinelinux.org/alpine/$BRANCH/community
#http://dl-cdn.alpinelinux.org/alpine/$BRANCH/testing
@edge http://dl-cdn.alpinelinux.org/alpine/edge/main
@edge http://dl-cdn.alpinelinux.org/alpine/edge/community
@testing http://dl-cdn.alpinelinux.org/alpine/edge/testing
	EOF

}
setup_autologin() {
	cat <<-EOF >> "$ROOT_MNT"/home/$USERNAME/.profile
TTY=$(tty);

if echo "$TTY" | grep -qE '^/dev/tty[0-9]+$' && [ -z "$SSH_CONNECTION" ]; then
#    startx
#dbus-daemon --system --fork
#sleep 2
COG_DISABLE_SANDBOX=1 /usr/bin/cog --doc-viewer --platform=drm $HOME_URL
fi
	EOF

	# Automatic login
	sed -i "s|^\(tty1::.*\)|#\1\ntty1::respawn:/sbin/agetty --autologin kiosk --noclear tty1|" "$ROOT_MNT"/etc/inittab
}

clean_files() {
	rm -f "$1"{/env.sh,/enter-chroot,/destroy,/apk.static,/setup.sh}
	find "$1"/var/cache/apk -mindepth 1 -delete

	if [ -z "$IP_ADDRESS" ]; then
		rm "$1"/etc/resolv.conf
	fi
}

shrink_image() {
	# From https://github.com/knoopx/alpine-raspberry-pi/blob/master/make-image

	# Shrink image
	local part_start=$(parted -ms "$1" unit B print | tail -n 1 | cut -d ':' -f 2 | tr -d 'B')
	local block_size=$(tune2fs -l "$2" | grep '^Block size:' | tr -d ' ' | cut -d ':' -f 2)
	local min_size=$(resize2fs -P "$2" | cut -d ':' -f 2 | tr -d ' ')

	# Shrink fs
	e2fsck -f -p "$2"
	resize2fs -p "$2" "$min_size"

	# Shrink partition
	local part_end=$((part_start + (min_size * block_size)))
	parted ---pretend-input-tty "$1" <<-EOF
	unit B
	resizepart 2 $part_end
	yes
	quit
	EOF
}

truncate_image() {
	# From https://github.com/knoopx/alpine-raspberry-pi/blob/master/make-image

	# Truncate free space
	local free_start=$(parted -ms "$1" unit B print free | tail -1 | cut -d ':' -f 2 | tr -d 'B')
	truncate -s "$free_start" "$1"
}


rm -f "$IMAGE_FILE"
truncate "$IMAGE_FILE" -s "$ROOT_SIZE"

(echo o;                                    # Create partition table
 echo n; echo p; echo 1; echo; echo +128MB; # Create boot partition
 echo t; echo c;                            # Set type to W95 FAT32 (LBA)
 echo n; echo p; echo 2; echo; echo;        # Create root partition
 echo w) | fdisk "$IMAGE_FILE"

LOOP_DEV=$(losetup -Pf --show "$IMAGE_FILE")
BOOT_DEV="$LOOP_DEV"p1
ROOT_DEV="$LOOP_DEV"p2

mkfs.fat -F32 "$BOOT_DEV"
mkfs.ext4 "$ROOT_DEV"

mkdir -p "$ROOT_MNT"
mount --make-private "$ROOT_DEV" "$ROOT_MNT"
mkdir -p "$ROOT_MNT/boot"
mount --make-private "$BOOT_DEV" "$ROOT_MNT/boot"

#setup_repo

curl https://raw.githubusercontent.com/alpinelinux/alpine-chroot-install/master/alpine-chroot-install \
	| sh -s -- \
		-a "$ARCH" -b "$BRANCH" -m "$MIRROR" -d "$ROOT_MNT" -r "@edge http://dl-cdn.alpinelinux.org/alpine/edge/main \
@edge http://dl-cdn.alpinelinux.org/alpine/edge/community" \
		-p "$BASE_PACKAGES $HW_PACKAGES $EXTRA_PACKAGES $BROWSER_PACKAGES $PACKAGES"

setup_first_boot
setup_disk
setup_bootloader
setup_network

gen_setup_script > "$ROOT_MNT"/setup.sh
chmod +x "$ROOT_MNT"/setup.sh
"$ROOT_MNT"/enter-chroot /setup.sh

setup_autologin

eval $COMMANDS

clean_files "$ROOT_MNT"
umount -lf "$ROOT_MNT"
rmdir "$ROOT_MNT"

shrink_image "$IMAGE_FILE" "$ROOT_DEV"
losetup -d "$LOOP_DEV"
truncate_image "$IMAGE_FILE"

# $COMPRESSOR "$IMAGE_FILE"
