import { EventComposer, fromEvent } from "@akala/client";
import { combineSubscriptions } from "@akala/core";

EventComposer.plugins['swipeDown'] = {
    beforeEventRegistration(grip)
    {
        const mousedown = fromEvent(grip, 'mousedown');
        const touchstart = fromEvent(grip, 'touchstart');
        const mousemove = fromEvent(window, 'mousemove');
        const touchmove = fromEvent(window, 'touchmove');
        const mouseup = fromEvent(window, 'mouseup');
        const touchend = fromEvent(window, 'touchend');

        let startY = 0;
        let currentY = 0;
        let startTime = 0;
        let isDragging = false;

        const dialog = grip.closest<ElementCSSInlineStyle & Element>('.swipe-container');

        function onStart(e)
        {
            const touch = e.touches ? e.touches[0] : e;
            startY = touch.clientY;
            currentY = startY;
            startTime = Date.now();
            isDragging = true;

            dialog.style.transition = "none";
        }

        function onMove(e)
        {
            if (!isDragging) return;
            const touch = e.touches ? e.touches[0] : e;
            const dy = touch.clientY - startY;
            if (dy > 0)
            {
                dialog.style.setProperty('--drag', `translateY(${dy}px)`);
            }
            currentY = touch.clientY;
        }

        function onEnd()
        {
            if (!isDragging) return;
            isDragging = false;

            const dy = currentY - startY;
            const dt = (Date.now() - startTime) / 1000;
            const velocity = dy / dt; // px per second

            // dialog.style.transition = "transform 0.3s ease";

            // Close if dragged far enough OR fast enough
            if (dy > 100 || velocity > 100)
            {
                dialog.style.setProperty('--drag', `translateY(-100%)`); // slide out
                dialog.addEventListener("transitionend", () =>
                {
                    dialog.style.removeProperty('transition');
                    dialog.style.removeProperty('--drag');
                    dialog.addEventListener("transitionend", () =>
                    {
                        if (dialog instanceof HTMLDialogElement)
                            dialog.close()
                        else
                            dialog.remove()
                    }, { once: true });
                }, { once: true });
            } else
            {
                dialog.style.setProperty('--drag', `translateY(0)`); // snap back
            }
        }

        return combineSubscriptions(
            mousedown.addListener(onStart),
            touchstart.addListener(onStart),
            mousemove.addListener(onMove),
            touchmove.addListener(onMove),
            mouseup.addListener(onEnd),
            touchend.addListener(onEnd)
        );
    },
}
