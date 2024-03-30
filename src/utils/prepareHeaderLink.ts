export const prepareLink = (
    url: string,
    start: number,
    end: number,
    type: "main" | "secondary" | "tertiary"
): string | null => {
    const link = url?.split("/").slice(start, end).join("/");
    if (type === "main") {
        return link;
    } else {
        if (link) {
            if (link.length > 10) {
                return link.substring(0, 10) + "...";
            } else {
                return link;
            }
        } else {
            return null;
        }
    }
};
