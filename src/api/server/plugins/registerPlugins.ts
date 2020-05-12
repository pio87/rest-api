import * as Hapi from '@hapi/hapi';

export type PluginConfig = { register: (server: Hapi.Server) => Promise<void> };

export const registerPlugins = async (server: Hapi.Server, plugins: PluginConfig[]) => {
  for (const plugin of plugins) {
    await plugin.register(server);
  }
};
