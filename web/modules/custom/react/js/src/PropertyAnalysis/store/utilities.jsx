// Returns mutable object to pass on
export const newState = (oldState, newValues) => {
  return {
    ...oldState,
    ...newValues,
  };
};

// Sizes
const breakpoints = {
  mobile: 480,
  tablet: 960,
  desktop: 1440,
  desktopWide: 1920,
}

export const width = ({width}) => width;
export const atBreakpoint = ({width}) => {
  let breakpoint = 'mobile';

  for (let array of Object.entries(breakpoints)) {
    if(array[1] > width) {
      return array[0];
    }
  }
};
export const isMobile = ({width}) => width < breakpoints.mobile;
export const isTablet = ({width}) => width >= breakpoints.mobile && width < breakpoints.tablet;
export const isDesktop = ({width}) => width >= breakpoints.tablet && width < breakpoints.desktop;
export const isDesktopWide = ({width}) => width >= breakpoints.desktop;

// export const isGtMobile = sizes => !withSizes.isMobile(sizes)
// export const isGtTablet = sizes => withSizes.isDesktop(sizes)

// export const isStTablet = sizes => withSizes.isMobile(sizes)
// export const isStDesktop = sizes => !withSizes.isStDesktop(sizes)

// export const isTabletAndGreater = sizes => !withSizes.isMobile(sizes)
// export const isTabletAndSmaller = sizes => !withSizes.isStDesktop(sizes)
