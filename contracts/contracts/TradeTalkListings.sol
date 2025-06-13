// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract TradeTalkListings {
    struct Listing {
        uint256 id;
        address seller;
        string itemName;
        uint256 price;
        bool active;
        address tokenAddress; // ERC-20 payment token
    }

    uint256 internal listingCounter;
    mapping(uint256 => Listing) public listings;

    event ListingCreated(uint256 indexed id, address indexed seller, string itemName, uint256 price, address tokenAddress);
    event ListingDeactivated(uint256 indexed id);

    function _createListing(string calldata _itemName, uint256 _price, address _tokenAddress) internal returns (uint256) {
        listingCounter++;
        listings[listingCounter] = Listing({
            id: listingCounter,
            seller: msg.sender,
            itemName: _itemName,
            price: _price,
            active: true,
            tokenAddress: _tokenAddress
        });

        emit ListingCreated(listingCounter, msg.sender, _itemName, _price, _tokenAddress);
        return listingCounter;
    }

    function _deactivateListing(uint256 _listingId) internal {
        listings[_listingId].active = false;
        emit ListingDeactivated(_listingId);
    }
}
