/**
 * HTML template for a loading card, typically used during data loading.
 *
 * @returns {string} HTML content representing a loading card.
 */
export const loadingCard = `
    <div class="card">
    <div class="card_content">
        <div class="card_content-header">
            <div class="card_header-icon_container animated-bg"></div>
                <div class="card_header-Content">
                    <span
                        class="card_header-Content--header card_header-Content--header--loading animated-bg animated-bg-text"
                    ></span>
                    <div
                        class="card_header-Content--content card_header-Content--content--loading animated-bg animated-bg-text"
                    ></div>
                </div>
            </div>
            <p
                class="card_header-title card_header-title--loading animated-bg animated-bg-text"
            ></p>
            <div class="card_header-description">
                <span class="animated-bg animated-bg-text"></span>
                <span class="animated-bg animated-bg-text"></span>
            </div>
        </div>
        <div class="card_image_container animated-bg"></div>
    </div>
`;
