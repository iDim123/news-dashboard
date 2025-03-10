'use client';

export const windowOpen = (
  url: string,
  {
    height,
    width,
    ...configRest
  }: { height: number; width: number; [key: string]: unknown }
) => {
  if (typeof window === 'undefined') return;

  const config: { [key: string]: string | number } = {
    height,
    width,
    location: 'no',
    toolbar: 'no',
    status: 'no',
    directories: 'no',
    menubar: 'no',
    scrollbars: 'yes',
    resizable: 'no',
    centerscreen: 'yes',
    chrome: 'yes',
    ...configRest,
  };

  window.open(
    url,
    '',
    Object.keys(config)
      .map((key) => `${key}=${config[key]}`)
      .join(', ')
  );
};

export const getPositionCenter = (width: number, height: number) => {
  if (typeof window === 'undefined') return {};

  return {
    left:
      window.outerWidth / 2 +
      (window.screenX || window.screenLeft || 0) -
      width / 2,
    top:
      window.outerHeight / 2 +
      (window.screenY || window.screenTop || 0) -
      height / 2,
  };
};
