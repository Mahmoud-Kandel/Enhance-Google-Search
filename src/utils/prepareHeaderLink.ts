/**
 * Prepares a link based on the specified type.
 *
 * @param {string} url - The URL string to prepare the link from.
 * @param {number} start - The starting index for slicing the URL.
 * @param {number} end - The ending index for slicing the URL.
 * @param {"main" | "secondary" | "tertiary"} type - The type of link to prepare.
 * @returns {string | null} The prepared link based on the specified type, or null if the link is invalid.
 *
 * This function prepares a link based on the specified type:
 *   - For type "main", it returns the link as is.
 *   - For types "secondary" or "tertiary", it checks the length of the link.
 *     - If the link has a length greater than 10 characters, it returns the first 10 characters followed by "...".
 *     - If the link has a length less than or equal to 10 characters, it returns the link as is.
 *   - If the link is null or undefined, it returns null.
 */
export const prepareLink = (
    url: string,
    start: number,
    end: number,
    type: "main" | "secondary" | "tertiary"
): string | null => {
    const link = url?.split("/").slice(start, end).join("/");

    switch (type) {
        case "main":
            return link;
        case "secondary":
        case "tertiary":
            if (link) {
                if (link.length > 10) {
                    return link.substring(0, 10) + "...";
                } else {
                    return link;
                }
            } else {
                return null;
            }
        default:
            return null;
    }
};
