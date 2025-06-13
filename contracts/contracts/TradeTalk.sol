// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./TradeTalkListings.sol";
import "./TradeTalkProofs.sol";
import "./TradeTalkEscrow.sol";

contract TradeTalk is TradeTalkListings, TradeTalkProofs, TradeTalkEscrow {
    function createListing(string calldata _itemName, uint256 _price, address _tokenAddress) external returns (uint256) {
        return _createListing(_itemName, _price, _tokenAddress);
    }

    function deactivateListing(uint256 _listingId) external {
        require(listings[_listingId].seller == msg.sender, "Not listing owner.");
        _deactivateListing(_listingId);
    }

    function submitProofOfAgreement(
        bytes32 _conversationHash,
        address _buyer,
        address _seller,
        bytes calldata _buyerSignature,
        bytes calldata _sellerSignature
    ) external {
        _submitProof(_conversationHash, _buyer, _seller, _buyerSignature, _sellerSignature);
    }

    function depositEscrow(
        bytes32 _conversationHash,
        address _seller,
        address _token,
        uint256 _amount
    ) external {
        _depositEscrow(_conversationHash, msg.sender, _seller, _token, _amount);
    }

    function releaseEscrow(bytes32 _conversationHash) external {
        require(msg.sender == escrows[_conversationHash].seller, "Only seller can release.");
        _releaseEscrow(_conversationHash);
    }

    function refundEscrow(bytes32 _conversationHash) external {
        require(msg.sender == escrows[_conversationHash].buyer, "Only buyer can refund.");
        _refundEscrow(_conversationHash);
    }
}
