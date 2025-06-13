// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract TradeTalkProofs {
    struct AgreementProof {
        bytes32 conversationHash;
        address buyer;
        address seller;
        bytes buyerSignature;
        bytes sellerSignature;
        uint256 timestamp;
    }

    mapping(bytes32 => AgreementProof) public proofs;

    event ProofSubmitted(bytes32 indexed conversationHash, address indexed buyer, address indexed seller);

    function _submitProof(
        bytes32 _conversationHash,
        address _buyer,
        address _seller,
        bytes calldata _buyerSignature,
        bytes calldata _sellerSignature
    ) internal {
        require(proofs[_conversationHash].timestamp == 0, "Proof already exists.");
        proofs[_conversationHash] = AgreementProof({
            conversationHash: _conversationHash,
            buyer: _buyer,
            seller: _seller,
            buyerSignature: _buyerSignature,
            sellerSignature: _sellerSignature,
            timestamp: block.timestamp
        });
        emit ProofSubmitted(_conversationHash, _buyer, _seller);
    }
}
