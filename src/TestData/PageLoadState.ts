/**
 * This enum hold the different page load states
 */

export enum PageLoadState {
    LOAD = "load",
    DOMCONTENTLOADED = "domcontentloaded",
    NETWORKIDLE ="networkidle",
    COMMIT = "commit"
}