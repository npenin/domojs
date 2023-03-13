import { FetchHttp } from '@akala/core'
import { scrapPage } from '../commands/scrap'
import { inspect } from 'util'

interface Recipe
{
    name: string,
    url: string,
    category: string;
    timings: { name: string, value: string }[],
    prepTime: string,
    preparations: {
        topings: { quantity: number, type: string }[],
        steps: {
            text: string,
            mode: string,
            cookTime: number,
            speed: number,
            accessories: {
                name: string;
                pictureUrl: string;
            }[]
        }[]
    }[],
    products: {
        name: string;
        pictureUrl: string;
    }[];

}

(async function ()
{
    // for (var category of ['desserts'])
    console.log(inspect(await scrapPage({
        url: 'https://www.guydemarle.com/recettes/croquettes-aux-crevettes-13346',
        items: {
            selector: '#context > .recipe-wrap',
            scrap: {
                name: {
                    selector: 'h1.single-recipe__title'
                },
                favorites: {
                    selector: '.single-recipe__buttons .add_recipe_to_favorite_list > div.label'
                },
                mark: {
                    selector: '.rating_comments .rating_comments__title'
                },
                category: {
                    selector: '.custom-label--category'
                },
                thematic: {
                    selector: '.custom-label--thematic'
                },
                timings: {
                    selector: '.devices-time__info',
                    multiple: true,
                    scrap: {
                        name: { selector: 'div.time' },
                        value: { selector: 'p' }
                    }
                },
                prepTime: {
                    selector: '.clock-and-text .time'
                },
                products: {
                    selector: '#products-slider li.glide__slide',
                    multiple: true,
                    scrap: {
                        name: {
                            selector: '.content .product-name'
                        },
                        pictureUrl: {
                            selector: '.product-link img',
                            attribute: 'src'
                        }
                    }
                },
                preparations: {
                    selector: '.prep-wrap',
                    multiple: true,
                    scrap: {
                        topings: {
                            selector: '.ingredients-container .ingredients-single',
                            multiple: true,
                            scrap: {
                                quantity: { selector: '.ingredient-label > .qty' },
                                type: { selector: '.ingredient-label', textNode: 0 }
                            }
                        },
                        steps: {
                            selector: '.ui.grid:not(.stackable)',
                            multiple: true,
                            scrap: {
                                text: { selector: '.step-description', textNode: 0 },
                                mode: { selector: '.step-description .step-meta__mode' },
                                cooktime: { selector: '.step-description .step-meta__cooktime' },
                                speed: { selector: '.step-description .step-meta__speed' },
                                accessories: {
                                    selector: '.step-accessories > .step-accessories__single',
                                    multiple: true,
                                    scrap: {
                                        name: { selector: '', dataset: 'tooltip' },

                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }, new FetchHttp()), false, 5, true));
})()