import { EventStruct } from '@/config/contracts';

// Mock events for testing and demonstration
export const generateMockEvents = (): EventStruct[] => {
  const events = [
    {
      id: BigInt(1),
      name: "Web3 Developer Meetup",
      description: "Join us for an evening of networking and learning about the latest developments in Web3 technology. We'll have talks from industry leaders, hands-on workshops, and plenty of time to connect with fellow developers.",
      location: "San Francisco, CA",
      date: BigInt(Math.floor(new Date('2025-11-15T18:00:00').getTime() / 1000)),
      organizer: "0x1234567890123456789012345678901234567890" as `0x${string}`,
      totalRSVPs: BigInt(42),
      maxTickets: BigInt(500),
      isSoldOut: false
    },
    {
      id: BigInt(2),
      name: "NFT Art Exhibition",
      description: "Experience the future of digital art at our exclusive NFT exhibition. Featuring works from renowned digital artists and emerging talents. Each attendee receives a commemorative POAP NFT.",
      location: "New York, NY",
      date: BigInt(Math.floor(new Date('2025-11-20T19:00:00').getTime() / 1000)),
      organizer: "0x2345678901234567890123456789012345678901" as `0x${string}`,
      totalRSVPs: BigInt(87),
      maxTickets: BigInt(200),
      isSoldOut: false
    },
    {
      id: BigInt(3),
      name: "DeFi Summit 2025",
      description: "The premier conference for decentralized finance professionals and enthusiasts. Learn about the latest protocols, regulatory updates, and investment strategies from industry experts.",
      location: "Miami, FL",
      date: BigInt(Math.floor(new Date('2025-12-01T09:00:00').getTime() / 1000)),
      organizer: "0x3456789012345678901234567890123456789012" as `0x${string}`,
      totalRSVPs: BigInt(156),
      maxTickets: BigInt(1000),
      isSoldOut: false
    },
    {
      id: BigInt(4),
      name: "Base Hackathon",
      description: "48-hour hackathon building the next generation of dApps on Base. $50K in prizes, mentorship from core team members, and the chance to launch your project with real users.",
      location: "Austin, TX",
      date: BigInt(Math.floor(new Date('2025-11-25T10:00:00').getTime() / 1000)),
      organizer: "0x4567890123456789012345678901234567890123" as `0x${string}`,
      totalRSVPs: BigInt(203),
      maxTickets: BigInt(300),
      isSoldOut: false
    },
    {
      id: BigInt(5),
      name: "Crypto Trading Workshop",
      description: "Learn advanced trading strategies and technical analysis for cryptocurrency markets. Suitable for both beginners and experienced traders. Includes hands-on exercises and real-time market analysis.",
      location: "Los Angeles, CA",
      date: BigInt(Math.floor(new Date('2025-11-18T14:00:00').getTime() / 1000)),
      organizer: "0x5678901234567890123456789012345678901234" as `0x${string}`,
      totalRSVPs: BigInt(64),
      maxTickets: BigInt(150),
      isSoldOut: false
    },
    {
      id: BigInt(6),
      name: "Blockchain Gaming Conference",
      description: "Explore the intersection of gaming and blockchain technology. Panel discussions with top game developers, demos of upcoming Web3 games, and networking opportunities.",
      location: "Seattle, WA",
      date: BigInt(Math.floor(new Date('2025-12-05T11:00:00').getTime() / 1000)),
      organizer: "0x6789012345678901234567890123456789012345" as `0x${string}`,
      totalRSVPs: BigInt(128),
      maxTickets: BigInt(400),
      isSoldOut: false
    },
    {
      id: BigInt(7),
      name: "DAO Governance Workshop",
      description: "Deep dive into decentralized autonomous organizations and governance mechanisms. Learn how to create, manage, and participate in DAOs effectively.",
      location: "Denver, CO",
      date: BigInt(Math.floor(new Date('2025-11-22T13:00:00').getTime() / 1000)),
      organizer: "0x7890123456789012345678901234567890123456" as `0x${string}`,
      totalRSVPs: BigInt(95),
      maxTickets: BigInt(200),
      isSoldOut: false
    },
    {
      id: BigInt(8),
      name: "Smart Contract Security Bootcamp",
      description: "Intensive workshop on smart contract security best practices, common vulnerabilities, and auditing techniques. Led by experienced security researchers.",
      location: "Boston, MA",
      date: BigInt(Math.floor(new Date('2025-12-10T09:00:00').getTime() / 1000)),
      organizer: "0x8901234567890123456789012345678901234567" as `0x${string}`,
      totalRSVPs: BigInt(78),
      maxTickets: BigInt(100),
      isSoldOut: false
    },
    {
      id: BigInt(9),
      name: "Metaverse Fashion Week",
      description: "The world's first fully virtual fashion week featuring digital couture, virtual runway shows, and exclusive NFT collections from top fashion designers.",
      location: "Virtual Event",
      date: BigInt(Math.floor(new Date('2025-11-28T20:00:00').getTime() / 1000)),
      organizer: "0x9012345678901234567890123456789012345678" as `0x${string}`,
      totalRSVPs: BigInt(312),
      maxTickets: BigInt(500),
      isSoldOut: false
    },
    {
      id: BigInt(10),
      name: "AI & Blockchain Integration Summit",
      description: "Explore how artificial intelligence and blockchain technology are converging to create revolutionary applications. Featuring demos, case studies, and expert panels.",
      location: "London, UK",
      date: BigInt(Math.floor(new Date('2025-12-15T14:00:00').getTime() / 1000)),
      organizer: "0x0123456789012345678901234567890123456789" as `0x${string}`,
      totalRSVPs: BigInt(189),
      maxTickets: BigInt(300),
      isSoldOut: false
    },
    {
      id: BigInt(11),
      name: "Sustainable Crypto Mining Conference",
      description: "Learn about eco-friendly cryptocurrency mining practices, renewable energy solutions, and the future of sustainable blockchain technology.",
      location: "Reykjavik, Iceland",
      date: BigInt(Math.floor(new Date('2025-12-08T10:00:00').getTime() / 1000)),
      organizer: "0x1234567890123456789012345678901234567890" as `0x${string}`,
      totalRSVPs: BigInt(76),
      maxTickets: BigInt(150),
      isSoldOut: false
    },
    {
      id: BigInt(12),
      name: "Web3 Music Festival",
      description: "Experience the future of music with blockchain-powered streaming, NFT music releases, and live performances from Web3 artists. Each ticket includes exclusive music NFTs.",
      location: "Berlin, Germany",
      date: BigInt(Math.floor(new Date('2025-11-30T19:00:00').getTime() / 1000)),
      organizer: "0x2345678901234567890123456789012345678901" as `0x${string}`,
      totalRSVPs: BigInt(245),
      maxTickets: BigInt(400),
      isSoldOut: false
    },
    {
      id: BigInt(13),
      name: "Decentralized Identity Workshop",
      description: "Learn about self-sovereign identity, decentralized identifiers (DIDs), and how to build privacy-preserving identity solutions using blockchain technology.",
      location: "Toronto, Canada",
      date: BigInt(Math.floor(new Date('2025-12-12T13:00:00').getTime() / 1000)),
      organizer: "0x3456789012345678901234567890123456789012" as `0x${string}`,
      totalRSVPs: BigInt(134),
      maxTickets: BigInt(200),
      isSoldOut: false
    },
    {
      id: BigInt(14),
      name: "Cross-Chain Bridge Security Summit",
      description: "Deep dive into cross-chain bridge technologies, security vulnerabilities, and best practices for building secure multi-chain applications.",
      location: "Singapore",
      date: BigInt(Math.floor(new Date('2025-12-18T09:00:00').getTime() / 1000)),
      organizer: "0x4567890123456789012345678901234567890123" as `0x${string}`,
      totalRSVPs: BigInt(167),
      maxTickets: BigInt(250),
      isSoldOut: false
    },
    {
      id: BigInt(15),
      name: "Web3 Creator Economy Conference",
      description: "Explore how creators are leveraging blockchain technology to build sustainable businesses, monetize content, and connect directly with their audiences.",
      location: "Los Angeles, CA",
      date: BigInt(Math.floor(new Date('2025-12-22T11:00:00').getTime() / 1000)),
      organizer: "0x5678901234567890123456789012345678901234" as `0x${string}`,
      totalRSVPs: BigInt(298),
      maxTickets: BigInt(500),
      isSoldOut: false
    }
  ];

  return events;
};

export const mockEvents = generateMockEvents();
