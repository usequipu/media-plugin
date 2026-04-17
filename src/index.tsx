import type { PluginApi } from './plugin-types';
import MediaViewer from './MediaViewer';

const MEDIA_RE = /\.(jpe?g|png|gif|svg|webp|bmp|ico|mp4|webm|ogg|mov)$/i;

export function init(api: PluginApi): void {
  api.register({
    id: 'media-plugin',
    canHandle: (tab) => !!tab.isMedia || MEDIA_RE.test(tab.name),
    priority: 10,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    component: MediaViewer as any,
  });
}
