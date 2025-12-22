/// <reference lib="webworker" />

declare var self: ServiceWorkerGlobalScope;

self.addEventListener('push', (event: PushEvent) =>
{
    const data = event.data?.json() ?? { title: 'No payload' };

    event.waitUntil(
        self.registration.showNotification(data.title, {
            body: data.body
        })
    );
});
