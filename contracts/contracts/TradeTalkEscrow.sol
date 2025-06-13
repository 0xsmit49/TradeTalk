// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract TradeTalkEscrow {
    struct Escrow {
        address buyer;
        address seller;
        address token;
        uint256 amount;
        bool released;
    }

    mapping(bytes32 => Escrow) public escrows;

    event Deposited(bytes32 indexed conversationHash, address indexed buyer, uint256 amount);
    event Released(bytes32 indexed conversationHash, address indexed seller);
    event Refunded(bytes32 indexed conversationHash, address indexed buyer);

    function _depositEscrow(bytes32 _conversationHash, address _buyer, address _seller, address _token, uint256 _amount) internal {
        require(escrows[_conversationHash].amount == 0, "Escrow already exists.");
        escrows[_conversationHash] = Escrow({
            buyer: _buyer,
            seller: _seller,
            token: _token,
            amount: _amount,
            released: false
        });

        require(IERC20(_token).transferFrom(_buyer, address(this), _amount), "ERC-20 transfer failed.");
        emit Deposited(_conversationHash, _buyer, _amount);
    }

    function _releaseEscrow(bytes32 _conversationHash) internal {
        Escrow storage e = escrows[_conversationHash];
        require(!e.released, "Already released.");
        e.released = true;
        require(IERC20(e.token).transfer(e.seller, e.amount), "ERC-20 transfer failed.");
        emit Released(_conversationHash, e.seller);
    }

    function _refundEscrow(bytes32 _conversationHash) internal {
        Escrow storage e = escrows[_conversationHash];
        require(!e.released, "Already released.");
        e.released = true;
        require(IERC20(e.token).transfer(e.buyer, e.amount), "ERC-20 transfer failed.");
        emit Refunded(_conversationHash, e.buyer);
    }
}
