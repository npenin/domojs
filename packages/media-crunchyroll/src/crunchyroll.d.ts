declare module 'crunchyroll.js'
{
    export interface Picture { height: number, source: string, type: string, width: number }
    export let client: {
        time?: number,
        getQuery: () => {},
        id?: string,
        access_token?: string,
        refresh_token?: string,
        bucket?: string,
        cms?: { bucket: string },
        login?: { email: string, password: string },
        locale?: string
    };
    // export function getToken(email, password): Promise<void>;
    // export function authenticate(): Promise<void>;
    export function login(email: string, password: string, locale?: string): Promise<void>;
    export function getProfile(): Promise<{
        age_consent: boolean,
        avatar: string,
        cr_beta_opt_in: boolean,
        crleg_email_verified: boolean,
        do_not_sell: boolean,
        email: string,
        extended_maturity_rating: Record<string, string>,
        maturity_rating: string,
        preferred_communication_language: string,
        preferred_content_audio_language: string,
        preferred_content_subtitle_language: string,
        profile_name: string,
        public_profile_enabled: boolean,
        qa_user: boolean,
        username: string
    }>;
    export function getAnime(animeId: string): Promise<object>;
    export function getSeasons(animeId: string): Promise<{
        __class__: 'collection',
        __href__: string,
        __resource_key__: string,
        __links__: object,
        __actions__: object,
        total: number,
        items: {
            __class__: 'season',
            __href__: string,
            __resource_key__: string,
            __links__: Record<string, { href: string }>,
            __actions__: object,
            id: string,
            channel_id: 'crunchyroll',
            title: string,
            slug_title: string,
            series_id: string,
            season_display_number: string,
            season_sequence_number: number,
            season_number: number,
            is_complete: boolean,
            description: string,
            keywords: string[],
            season_tags: string[],
            images: Record<string, { height: number, source: string, type: string, width: number }>,
            extended_maturity_rating: {},
            maturity_ratings: string[],
            is_mature: boolean,
            mature_blocked: boolean,
            is_subbed: boolean,
            is_dubbed: boolean,
            is_simulcast: boolean,
            seo_title: string,
            seo_description: string,
            availability_notes: string,
            audio_locales: string[],
            subtitle_locales: string[],
            audio_locale: string,
            versions: { audio_locale: string, guid: string, original: boolean, variant: string }[],
            identifier: string
        }[]
    }>;
    export function getEpisodes(seasonId: string): Promise<{
        total: number,
        items:
        {
            __class__: 'episode',
            __href__: string,
            __resource_key__: string,
            __links__: {
                ads: { href: string },
                'episode/channel': { href: string },
                'episode/season': { href: string },
                'episode/series': { href: string }
            },
            __actions__: {},
            id: string,
            channel_id: string,
            series_id: string,
            series_title: string,
            series_slug_title: string,
            season_id: string,
            season_title: string,
            season_slug_title: string,
            season_number: number,
            episode: string,
            episode_number: number,
            sequence_number: number,
            production_episode_id: string,
            title: string,
            slug_title: string,
            description: string,
            hd_flag: boolean,
            maturity_ratings: string[],
            extended_maturity_rating: {},
            is_mature: boolean,
            mature_blocked: boolean,
            episode_air_date: string,
            upload_date: string,
            availability_starts: null | string,
            availability_ends: null | string,
            eligible_region: null | string,
            available_date: null | string,
            free_available_date: string,
            premium_date: null | string,
            premium_available_date: null | string,
            is_subbed: boolean,
            is_dubbed: boolean,
            is_clip: boolean,
            seo_title: string,
            seo_description: string,
            season_tags: string[],
            available_offline: boolean,
            subtitle_locales: string[],
            availability_notes: string,
            audio_locale: string,
            versions: [[Object]],
            closed_captions_available: boolean,
            identifier: string,
            media_type: 'episode',
            slug: string,
            images: Record<'thumbnail', Picture[]>,
            duration_ms: number,
            ad_breaks: [[Object], [Object], [Object], [Object]],
            is_premium_only: true,
            listing_id: ''
        }[]
    }>;
    export function getCategories(animeId: string): Promise<object>;
    export function getRate(animeId: string): Promise<object>
    export function getSimilar(animeId: string, items?: number): Promise<object>
    export function search(query): Promise<object>;
    export function getAllAnimes(start?: number, items?: number, sortBy?: string): Promise<
        {
            total: number,
            items: {
                linked_resource_key: string,
                __href__: string,
                external_id: string,
                images: Record<string, { height: number, source: string, type: string, width: number }>,
                promo_title: string,
                type: 'series' | 'movie_listing',
                description: string,
                __class__: 'panel',
                promo_description: string,
                series_metadata?: {
                    audio_locales: string[],
                    availability_notes: '',
                    episode_count: number,
                    extended_description: string,
                    extended_maturity_rating: object,
                    is_dubbed: boolean,
                    is_mature: boolean,
                    is_simulcast: boolean,
                    is_subbed: boolean,
                    mature_blocked: boolean,
                    maturity_ratings: string[],
                    season_count: number,
                    series_launch_year: number,
                    subtitle_locales: string[],
                    tenant_categories: string[]
                },
                new: boolean,
                new_content: boolean,
                __links__: Record<string, { href: string }>,
                __actions__: object,
                channel_id: string,
                id: string,
                slug_title: string,
                slug: string,
                last_public: string,
                title: string
            }[],
            __class__: 'disc_browse',
            __href__: string,
            __resource_key__: string,
            __links__: {
                continuation: {
                    href: string
                }
            },
            __actions__: {}
        }>;
    export function getNewsFeed(): Promise<object>
}