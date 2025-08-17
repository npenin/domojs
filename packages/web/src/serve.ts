
export interface MenuItem
{
    icon: string;
    text: string;

}

export interface Plugin
{
    name: string
    mount(container: HTMLElement): void
    unmount?(container: HTMLElement): void
}