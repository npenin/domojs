import { FetchHttp } from '@akala/core'
import scrap from '../commands/scrap'

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
    var results = [];
    for (var category of ['desserts'])
    // for (var category of ['apéritifs', 'entrées', 'plats', 'desserts', 'glaces', 'boulangerie', 'accompagnements', 'boissons', 'soupes et crèmes', 'cakes et quiches salés', 'sauces', 'autres'])
    {
        var categoryResults = await scrap({
            page: {
                url: 'https://www.guydemarle.com/recettes?is_icookable=true', nextPage: { query: { page: '{{$page}}', categories: category } }, items: {
                    selector: 'div.column > div.card.custom-card',
                    details: {
                        url: { selector: 'div.content.recipe-card h2.recipe-title__wrap > a', attribute: 'href' },
                        items: {
                            selector: '#context > .recipe-wrap',
                            scrap: {
                                name: {
                                    selector: 'h1.single-recipe__title'
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
                    },
                    scrap: {
                        name: {
                            selector: 'div.content.recipe-card h2.recipe-title__wrap > a'
                        },
                        url: { selector: 'div.content.recipe-card h2.recipe-title__wrap > a', attribute: 'href' }
                    }
                }
            }
        }, new FetchHttp()) as Recipe[];
        results.push(...categoryResults.map(e => (e.category = category, e)));
    }
    console.log(JSON.stringify(results));
})()