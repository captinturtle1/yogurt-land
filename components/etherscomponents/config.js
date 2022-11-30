export const yogurtverseContract = "0x997D3bB97c6bFBb05BFF85CC44130A23EC9D4150";
export const gurtsContract = "0xE9088EF3f71B4539A390f8e9EacBd56F60DfBcCA";
export const stakeContract = "0xf79eE36Db4fE7129100a087493f2121Ba7763acB";

const whitelistedAddresses =
[
    "0xDE768b5E21459CaeAEA7a9Ea96354FF361507dFB",
    "0xd229eD9B9f68CeE3d0532bdc5b1f1C866daeD5d7",
    "0xAEebD32CFC3979aFC08568c607B834B4bF7bBcD3"
];

export const lowerAddresses = whitelistedAddresses.map(element => {
    return element.toLowerCase();
});