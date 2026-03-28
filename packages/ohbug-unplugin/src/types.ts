/**
 * Base configuration for Ohbug sourcemap upload.
 * Ohbug sourcemap 上传的基础配置。
 */
export interface Config {
  apiKey: string;
  appVersion: string;
  appType?: string;
  endpoint?: string;
}

/**
 * Plugin options extending the base config.
 * 插件选项，扩展基础配置。
 */
export interface Options extends Config {
  /** Public path prefix for sourcemap files. / sourcemap 文件的公共路径前缀。 */
  publicPath?: string;
  /** Whether to delete sourcemap files after uploading. / 上传后是否删除 sourcemap 文件。 */
  deleteAfterUploading?: boolean;
}

/**
 * Represents a sourcemap asset to be uploaded.
 * 表示待上传的 sourcemap 资源。
 */
export interface Asset extends Config {
  path: string;
}
