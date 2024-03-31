/**
 * Formats a breadcrumb string, truncating it if necessary.
 *
 * @param {string} breadCramp The breadcrumb string to be formatted.
 * @returns {string | null} The formatted breadcrumb string, or null if the breadcrumb value is empty.
 */
const formatbeadCaramps = (breadCramp: string): string | null => {
    if (breadCramp) {
        if (breadCramp.length > 10) {
            return breadCramp.slice(0, 10) + "...";
        }
        return breadCramp;
    } else {
        return null;
    }
};

/**
 * Prepares link data by extracting origin and breadcrumb information from the URL.
 *
 * @param {string} url The URL from which to extract link data.
 * @returns {{ origin: string | null; firstBreadCramp: string | null; secondBreadCramp: string | null }} An object containing the origin and breadcrumb information.
 */
export const prepareLink = (
    url: string
): {
    origin: string | null;
    firstBreadCramp: string | null;
    secondBreadCramp: string | null;
} => {
    const linkUrl = new URL(url);
    const { origin, pathname } = linkUrl;
    const breadCramps = pathname.split("/");
    const firstBreadCramp = formatbeadCaramps(breadCramps[0]);
    const secondBreadCramp = formatbeadCaramps(breadCramps[1]);

    return { origin, firstBreadCramp, secondBreadCramp };
};
