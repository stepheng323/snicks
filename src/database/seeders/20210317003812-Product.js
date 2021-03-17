export default {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Products',
      [
        {
          title: 'Airforce 1',
          description:
            "Buy Nike Men's Air Force 1 Low Sneaker and other Basketball at Amazon.com. Our wide selection is eligible for free shipping and free returns.",
          price: 27000,
          colors: ['white'],
          images: ['http:dddhjdhdjkdkdd', 'http://eeyeueehgkehele'],
          specification: '',
          brandId: 1,
          userId: 2,
          sizes: [41, 42, 43, 45],
        },
        {
          title: 'Stan smith shoes',
          description:
            'An emblem of chic minimalism, the adidas Stan Smith Shoes have always been at the forefront of modern culture. This version joins others fighting for our planet with a commitment to a better future. The signature details are all there, but the iconic shoes are crafted to reduce material waste. We all still have a long way to go. Join us on this journey.',
          price: 40000,
          colors: ['white', 'red'],
          images: ['http:dddhjdhdjkdkdd', 'http://eeyeueehgkehele'],
          specification: '',
          brandId: 2,
          userId: 2,
          sizes: [41, 42, 43, 45, 46],
        },
        {
          title: 'ZX 2K boost shoes',
          description:
            "Some people live in the past. Some only think of the future. Lace up in these adidas ZX 2K Boost Shoes and see the value in both. Reworking '80s technical runners from the archive, a sandwich mesh upper pairs with futuristic TPU overlays for a look that's part past, part future. Bold logo graphics stand out on the comfortable Boost midsole for a purely modern edge.",
          price: 45000,
          colors: ['Cloud White', 'Silver Metallic', 'Core Black'],
          images: ['http:dddhjdhdjkdkdd', 'http://eeyeueehgkehele'],
          specification: '',
          brandId: 5,
          userId: 2,
          sizes: [41, 42, 43, 45],
        },
        {
          title: 'TWO WXY',
          description:
            'For the players unbound by position, no longer defined by 1 through 5, the TWO WXY is built for your style of play. Hyper-engineered for speed and agility at both ends of the court, it’s a performance shoe packed with tech for that explosive moment when you switch from offense to defense to offense again. The TWO WXY specializes in versatility—the playmaker of today’s positionless game.',
          price: 35000,
          colors: ['yellow'],
          images: ['http:dddhjdhdjkdkdd', 'http://eeyeueehgkehele'],
          specification: '',
          brandId: 5,
          userId: 2,
          sizes: [39, 41, 42, 45, 47],
        },
        {
          title: 'Puma x Nemen Centaur Disc Mid',
          description:
            'Old school meets new school in CA Pro Classic. The latest addition to the California family is taking West Coast street style to the next level',
          price: 55000,
          colors: ['black'],
          images: ['http:dddhjdhdjkdkdd', 'http://eeyeueehgkehele'],
          specification: '',
          brandId: 1,
          userId: 2,
          sizes: [38, 41, 43, 45, 47],
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bultDelete('Products', null, {});
  },
};
