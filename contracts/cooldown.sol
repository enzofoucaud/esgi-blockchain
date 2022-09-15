// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Cooldown {
    // Enum status of order
    enum OrderStatus {
        Created,
        Completed
    }

    /// The Order struct
    struct Order {
        uint256 id;
        address sender;
        address receiver;
        uint256 amount;
        uint256 deadline;
        OrderStatus status;
    }

    /// The mapping to store orders
    mapping(uint256 => Order) orders;

    /// The sequence number of orders
    uint256 orderseq;

    event Deposit(address sender, uint256 amount);
    event Withdraw(address sender);

    function deposit(address receiver, uint amount, uint deadline) public payable {
        /// Increment the order sequence
        orderseq++;

        /// Create the order register
        orders[orderseq] = Order(
            orderseq,
            msg.sender,
            receiver,
            amount,
            deadline,
            OrderStatus.Created
        );

        emit Deposit(msg.sender, msg.value);
    }

    function withdraw(uint256 id) public {
        /// Get the order
        Order storage order = orders[id];

        /// Check the order status
        require(order.status == OrderStatus.Created, "Order is not created");

        /// Check the deadline
        require(order.deadline > block.timestamp, "Order is not completed");

        /// Transfer the amount to sender
        payable(order.sender).transfer(order.amount);

        /// Update the order status
        order.status = OrderStatus.Completed;

        emit Withdraw(msg.sender);
    }
}
