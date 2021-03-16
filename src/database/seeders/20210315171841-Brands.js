export default {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Brands',
      [
        {
          name: 'Nike',
          description:
            'Nike, Inc. is an American multinational corporation that is engaged in the design, development, manufacturing, and worldwide marketing and sales of footwear, apparel, equipment, accessories, and services.',
        },
        {
          name: 'Adidas',
          description: 'Adidas AG is a German multinational corporation, founded and headquartered in Herzogenaurach, Germany, that designs and manufactures shoes, clothing and accessories. It is the largest sportswear manufacturer in Europe, and the second largest in the world, after Nike',
        },
        {
          name: 'Converse',
          description: 'Converse is an American shoe company that designs, distributes, and licenses sneakers, skating shoes, lifestyle brand footwear, apparel, and accessories. Founded in 1908, it has been a subsidiary of Nike, Inc. since 2003',
        },
        {
          name: 'Balenciaga',
          description: 'Balenciaga is a luxury fashion house founded in 1917 by Spanish designer Cristóbal Balenciaga in San Sebastián, Spain and currently based in Paris. Balenciaga had a reputation as a couturier of uncompromising standards and was referred to as "the master of us all" by Christian Dior.',
        },
        {
          name: 'New Balance',
          description: 'New Balance is an American sports footwear and apparel brand that was established in 1906. The brand was originally associated with the New Balance Arch Support Company.',
        },
        {
          name: 'Puma',
          description: 'Puma SE, branded as Puma, is a German multinational corporation that designs and manufactures athletic and casual footwear, apparel and accessories, which is headquartered in Herzogenaurach, Bavaria, Germany. Puma is the third largest sportswear manufacturer in the world',
        },
        {
          name: 'Vans',
          description: 'Vans is an American manufacturer of skateboarding shoes and related apparel, started in Anaheim, California, and owned by VF Corporation',
        },
        {
          name: 'Air Jordan',
          description: 'Air Jordan (sometimes abbreviated AJ) is an American brand of basketball shoes, athletic, casual, and style clothing produced by Nike.',
        },
        {
          name: 'Reebok',
          description: 'eebok produces and distributes fitness, running and CrossFit sportswear including clothing and footwear.',
        },
        {
          name: 'Gucci',
          description: 'Gucci is a luxury fashion house based in Florence, Italy. Its product lines include handbags, ready-to-wear, footwear, and accessories, makeup, fragrances, and home decoration',
        },
        {
          name: 'Alexander McQueen',
          description: 'Alexander McQueen is a British luxury fashion house founded by designer Alexander McQueen in 1992',
        },
        {
          name: 'Prada',
          description: 'Prada S.p.A. is an Italian luxury fashion house that was founded in 1913 by Mario Prada. It specializes in leather handbags, travel accessories, shoes, ready-to-wear, perfumes and other accessories.',
        },
        {
          name: 'Fendi',
          description: 'Fendi is an Italian luxury fashion house producing fur, ready-to-wear, leather goods, shoes, fragrances, eyewear, timepieces and accessories',
        },
        {
          name: 'Paul Smith',
          description: "Paul Smith is Britain's foremost designer. Shop designer men's and women's clothing, shoes & accessories",
        },
        {
          name: 'Lacoste',
          description: 'Lacoste S.A. is a French company, founded in 1933 by tennis player René Lacoste and André Gillier. It sells clothing, footwear, sportswear, eyewear, leather goods, perfume, towels and watches.',
        },
      ],
      {}
    );
  },
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Brands', null, {}),
};
