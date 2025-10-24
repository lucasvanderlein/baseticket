// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title BaseEvent - Updated with Ticket Limits
 * @dev On-chain event ticketing with NFT proof of attendance on Base Sepolia
 * This version includes ticket limits and sold-out functionality
 */

// Simplified ERC721 implementation
contract ERC721 {
    mapping(uint256 => address) private _owners;
    mapping(address => uint256) private _balances;
    mapping(uint256 => address) private _tokenApprovals;
    mapping(address => mapping(address => bool)) private _operatorApprovals;

    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);
    event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId);
    event ApprovalForAll(address indexed owner, address indexed operator, bool approved);

    function balanceOf(address owner) public view returns (uint256) {
        require(owner != address(0), "ERC721: address zero is not a valid owner");
        return _balances[owner];
    }

    function ownerOf(uint256 tokenId) public view returns (address) {
        address owner = _ownerOf(tokenId);
        require(owner != address(0), "ERC721: invalid token ID");
        return owner;
    }

    function _ownerOf(uint256 tokenId) internal view returns (address) {
        return _owners[tokenId];
    }

    function _exists(uint256 tokenId) internal view returns (bool) {
        return _ownerOf(tokenId) != address(0);
    }

    function _mint(address to, uint256 tokenId) internal {
        require(to != address(0), "ERC721: mint to the zero address");
        require(!_exists(tokenId), "ERC721: token already minted");

        _balances[to] += 1;
        _owners[tokenId] = to;

        emit Transfer(address(0), to, tokenId);
    }

    function _safeMint(address to, uint256 tokenId) internal {
        _mint(to, tokenId);
    }

    function approve(address to, uint256 tokenId) public {
        address owner = ownerOf(tokenId);
        require(to != owner, "ERC721: approval to current owner");
        require(msg.sender == owner || isApprovedForAll(owner, msg.sender), "ERC721: approve caller is not token owner or approved for all");

        _approve(to, tokenId);
    }

    function _approve(address to, uint256 tokenId) internal {
        _tokenApprovals[tokenId] = to;
        emit Approval(ownerOf(tokenId), to, tokenId);
    }

    function isApprovedForAll(address owner, address operator) public view returns (bool) {
        return _operatorApprovals[owner][operator];
    }

    function setApprovalForAll(address operator, bool approved) public {
        _setApprovalForAll(msg.sender, operator, approved);
    }

    function _setApprovalForAll(address owner, address operator, bool approved) internal {
        require(owner != operator, "ERC721: approve to caller");
        _operatorApprovals[owner][operator] = approved;
        emit ApprovalForAll(owner, operator, approved);
    }

    function getApproved(uint256 tokenId) public view returns (address) {
        _requireMinted(tokenId);
        return _tokenApprovals[tokenId];
    }

    function _requireMinted(uint256 tokenId) internal view {
        require(_exists(tokenId), "ERC721: invalid token ID");
    }

    function name() public pure returns (string memory) {
        return "BaseEvent Ticket";
    }

    function symbol() public pure returns (string memory) {
        return "BEVT";
    }

    function tokenURI(uint256 tokenId) public view returns (string memory) {
        _requireMinted(tokenId);
        return string(abi.encodePacked("https://baseevent.com/ticket/", _toString(tokenId)));
    }

    function _toString(uint256 value) internal pure returns (string memory) {
        if (value == 0) {
            return "0";
        }
        uint256 temp = value;
        uint256 digits;
        while (temp != 0) {
            digits++;
            temp /= 10;
        }
        bytes memory buffer = new bytes(digits);
        while (value != 0) {
            digits -= 1;
            buffer[digits] = bytes1(uint8(48 + uint256(value % 10)));
            value /= 10;
        }
        return string(buffer);
    }
}

// Simplified Ownable implementation
contract Ownable {
    address private _owner;

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    constructor() {
        _transferOwnership(msg.sender);
    }

    function owner() public view returns (address) {
        return _owner;
    }

    modifier onlyOwner() {
        require(owner() == msg.sender, "Ownable: caller is not the owner");
        _;
    }

    function _transferOwnership(address newOwner) internal {
        address oldOwner = _owner;
        _owner = newOwner;
        emit OwnershipTransferred(oldOwner, newOwner);
    }
}

// Main BaseEvent contract
contract BaseEvent is ERC721, Ownable {
    uint256 private _eventIdCounter;
    uint256 private _tokenIdCounter;

    struct Event {
        uint256 id;
        string name;
        string description;
        string location;
        uint256 date;
        address organizer;
        uint256 totalRSVPs;
        uint256 maxTickets;
        bool isSoldOut;
    }

    mapping(uint256 => Event) public events;
    mapping(uint256 => mapping(address => bool)) public hasRSVPed;
    mapping(uint256 => uint256) public tokenToEvent;
    mapping(address => uint256[]) private userTickets;

    event EventCreated(uint256 indexed id, string name, address indexed organizer);
    event RSVPed(uint256 indexed eventId, address indexed attendee, uint256 tokenId);
    event EventCancelled(uint256 indexed eventId, address indexed organizer);

    constructor() {
        _createInitialEvents();
    }

    /**
     * @dev Create initial events for demonstration
     */
    function _createInitialEvents() private {
        // Event 1: Web3 Developer Meetup
        _createEventInternal(
            "Web3 Developer Meetup",
            "Join us for an evening of networking and learning about the latest developments in Web3 technology. We'll have talks from industry leaders, hands-on workshops, and plenty of time to connect with fellow developers.",
            "San Francisco, CA",
            block.timestamp + 30 days,
            500
        );

        // Event 2: NFT Art Exhibition
        _createEventInternal(
            "NFT Art Exhibition",
            "Experience the future of digital art at our exclusive NFT exhibition. Featuring works from renowned digital artists and emerging talents. Each attendee receives a commemorative POAP NFT.",
            "New York, NY",
            block.timestamp + 35 days,
            200
        );

        // Event 3: DeFi Summit 2025
        _createEventInternal(
            "DeFi Summit 2025",
            "The premier conference for decentralized finance professionals and enthusiasts. Learn about the latest protocols, regulatory updates, and investment strategies from industry experts.",
            "Miami, FL",
            block.timestamp + 45 days,
            1000
        );

        // Event 4: Base Hackathon
        _createEventInternal(
            "Base Hackathon",
            "48-hour hackathon building the next generation of dApps on Base. $50K in prizes, mentorship from core team members, and the chance to launch your project with real users.",
            "Austin, TX",
            block.timestamp + 40 days,
            300
        );

        // Event 5: Crypto Trading Workshop
        _createEventInternal(
            "Crypto Trading Workshop",
            "Learn advanced trading strategies and technical analysis for cryptocurrency markets. Suitable for both beginners and experienced traders. Includes hands-on exercises and real-time market analysis.",
            "Los Angeles, CA",
            block.timestamp + 25 days,
            150
        );

        // Event 6: Blockchain Gaming Conference
        _createEventInternal(
            "Blockchain Gaming Conference",
            "Explore the intersection of gaming and blockchain technology. Panel discussions with top game developers, demos of upcoming Web3 games, and networking opportunities.",
            "Seattle, WA",
            block.timestamp + 50 days,
            400
        );
    }

    /**
     * @dev Internal function to create events
     */
    function _createEventInternal(
        string memory name,
        string memory description,
        string memory location,
        uint256 date,
        uint256 maxTickets
    ) private {
        uint256 eventId = _eventIdCounter++;
        
        events[eventId] = Event({
            id: eventId,
            name: name,
            description: description,
            location: location,
            date: date,
            organizer: owner(),
            totalRSVPs: 0,
            maxTickets: maxTickets,
            isSoldOut: false
        });

        emit EventCreated(eventId, name, owner());
    }

    /**
     * @dev Create a new event
     */
    function createEvent(
        string memory name,
        string memory description,
        string memory location,
        uint256 date,
        uint256 maxTickets
    ) external {
        require(maxTickets > 0, "Max tickets must be greater than 0");
        
        uint256 eventId = _eventIdCounter++;
        
        events[eventId] = Event({
            id: eventId,
            name: name,
            description: description,
            location: location,
            date: date,
            organizer: msg.sender,
            totalRSVPs: 0,
            maxTickets: maxTickets,
            isSoldOut: false
        });

        emit EventCreated(eventId, name, msg.sender);
    }

    /**
     * @dev RSVP to an event and mint NFT ticket
     */
    function rsvp(uint256 eventId) external returns (uint256) {
        require(events[eventId].id == eventId, "Event does not exist");
        require(!hasRSVPed[eventId][msg.sender], "Already RSVPed");
        require(events[eventId].date > block.timestamp, "Event has ended");
        require(!events[eventId].isSoldOut, "Event is sold out");
        require(events[eventId].totalRSVPs < events[eventId].maxTickets, "No tickets available");

        hasRSVPed[eventId][msg.sender] = true;
        events[eventId].totalRSVPs++;

        // Check if event is now sold out
        if (events[eventId].totalRSVPs >= events[eventId].maxTickets) {
            events[eventId].isSoldOut = true;
        }

        uint256 tokenId = _tokenIdCounter++;
        _safeMint(msg.sender, tokenId);
        tokenToEvent[tokenId] = eventId;
        userTickets[msg.sender].push(tokenId);

        emit RSVPed(eventId, msg.sender, tokenId);
        return tokenId;
    }

    /**
     * @dev Get all events
     */
    function getAllEvents() external view returns (Event[] memory) {
        Event[] memory allEvents = new Event[](_eventIdCounter);
        for (uint256 i = 0; i < _eventIdCounter; i++) {
            allEvents[i] = events[i];
        }
        return allEvents;
    }

    /**
     * @dev Get total number of events
     */
    function getEventCount() external view returns (uint256) {
        return _eventIdCounter;
    }

    /**
     * @dev Get user's tickets
     */
    function getUserTickets(address user) external view returns (uint256[] memory) {
        return userTickets[user];
    }

    /**
     * @dev Get event details for a ticket
     */
    function getTicketEvent(uint256 tokenId) external view returns (Event memory) {
        require(_exists(tokenId), "Token does not exist");
        return events[tokenToEvent[tokenId]];
    }

    /**
     * @dev Get available tickets for an event
     */
    function getAvailableTickets(uint256 eventId) external view returns (uint256) {
        require(events[eventId].id == eventId, "Event does not exist");
        if (events[eventId].isSoldOut) {
            return 0;
        }
        return events[eventId].maxTickets - events[eventId].totalRSVPs;
    }

    /**
     * @dev Check if event is sold out
     */
    function isEventSoldOut(uint256 eventId) external view returns (bool) {
        require(events[eventId].id == eventId, "Event does not exist");
        return events[eventId].isSoldOut;
    }

    /**
     * @dev Cancel an event (only event organizer can cancel)
     * Can cancel both future and past events
     */
    function cancelEvent(uint256 eventId) external {
        require(events[eventId].id == eventId, "Event does not exist");
        require(events[eventId].organizer == msg.sender, "Only organizer can cancel");
        require(events[eventId].date > 0, "Event already cancelled");
        
        // Mark event as cancelled by setting date to 0
        events[eventId].date = 0;
        
        emit EventCancelled(eventId, msg.sender);
    }

    /**
     * @dev Check if event is cancelled
     */
    function isEventCancelled(uint256 eventId) external view returns (bool) {
        return events[eventId].date == 0;
    }

    /**
     * @dev Get all active events (not cancelled)
     */
    function getActiveEvents() external view returns (Event[] memory) {
        uint256 activeCount = 0;
        
        // Count active events
        for (uint256 i = 0; i < _eventIdCounter; i++) {
            if (events[i].date > 0) {
                activeCount++;
            }
        }
        
        // Create array with active events
        Event[] memory activeEvents = new Event[](activeCount);
        uint256 index = 0;
        
        for (uint256 i = 0; i < _eventIdCounter; i++) {
            if (events[i].date > 0) {
                activeEvents[index] = events[i];
                index++;
            }
        }
        
        return activeEvents;
    }
}
