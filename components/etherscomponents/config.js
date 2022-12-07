import { whitelistedAddresses } from './whitelist';

export const yogurtverseContract = "0xC34CC9f3Cf4E1F8DD3cde01BBE985003dcFc169f";
export const gurtsContract = "0x91D91dCFB29C55f66d97Fdf67f89c0c6d5529e38";

export const lowerAddresses = whitelistedAddresses.map(element => {
    return element.toLowerCase();
});