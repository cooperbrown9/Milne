export const JUICES = [
  {
    'name': 'Apple',
    'brix': 11.5,
    'image': require('../../assets/fruits/apple.png'),
    'juiceTypes': [
      {
        title: '70 Brix', url: 'https://milnefruit.com/images/specsheets/specifications/Milne_AppleJuice70BrixSpec.pdf',
      },
      {
        title: 'Organic 70 Brix', url: 'https://milnefruit.com/images/specsheets/specifications/Milne_AppleJuice70BrixOrganicSpec.pdf'
      }
    ],
    'pureeTypes': [
      {
        title: '32 Brix', url: 'https://milnefruit.com/images/specsheets/specifications/Milne_ApplePuree32BrixSpec.pdf'
      }
    ],
    description: 'Apples are a wholesome source of fiber, Vitamin C, and antioxidants, and are free of fat and cholesterol. With flavors ranging from sweet to tart, apples are a popular snack used in a wide range of food and beverage products.'
  },


  {
    'name': 'Apricot', 'brix': 11.7, 'image': require('../../assets/fruits/apricot.png'),
    'juiceTypes': [{
      title: '65 Brix', url: 'https://milnefruit.com/images/specsheets/specifications/Milne_ApricotJuice65BrixSpec.pdf'
    }],
    'pureeTypes':[{
      title: 'NFC', url: 'https://milnefruit.com/images/specsheets/specifications/Milne_ApricotPureeNFCSpec.pdf'
    }],
    description: 'Apricots offer a unique flavor profile, and are valuable supplements or ingredients. These fruits are packed with Vitamins A and C, dietary fiber, polyphenols, and antioxidants, while also low in both saturated fat and cholesterol.'
    },
    {'name': 'Blackberry', 'brix': 10.0, 'image': require('../../assets/fruits/blackberry.png'),
    'juiceTypes': [{
      title: '65 Brix', url: 'https://milnefruit.com/images/specsheets/specifications/Milne_BlackberryJuice65BrixSpec.pdf'
    }, ],
    'pureeTypes':[{
      title: '28 Brix', url: 'https://milnefruit.com/images/specsheets/specifications/Milne_BlackberryPuree28BrixSpec.pdf'
    }, {
      title: 'NFC - Asceptic', url: 'https://milnefruit.com/images/specsheets/specifications/Milne_BlackberryPureeNFCAsepSpec.pdf'
    }, {
      title: 'Organic NFC - Asceptic', url: 'https://milnefruit.com/images/specsheets/specifications/Milne_BlackberryPureeNFCAsepOrgSpec.pdf'
    }],
    description: 'Blackberries are made up of multiple small fruits with seeds that offer different nutrients like Vitamins C and K, cancer-fighting polyphenols, and manganese. Blackberries are a great low calorie, fat and cholesterol free snack often added to beverages, baked goods and granola bars.'
  },
  {'name': 'Blueberry', 'brix': 10.0, 'image': require('../../assets/fruits/blueberry.png'),
  'juiceTypes': [{
    title: '32.5 Brix', url: 'https://milnefruit.com/images/specsheets/specifications/Milne_BlueberryJuice32.5BrixSpec.pdf'
  }, {
    title: '65 Brix', url: 'https://milnefruit.com/images/specsheets/specifications/Milne_BlueberryJuice65BrixSpec.pdf'
  }, {
    title: '65 Brix Organic', url: 'https://milnefruit.com/images/specsheets/specifications/Milne_BlueberryJuice65BrixOrganicSpec.pdf'
  }],
  'pureeTypes':[{
    title: '30 Brix', url: 'https://milnefruit.com/images/specsheets/specifications/Milne_BlueberryPuree30BrixSpec.pdf'
  }, {
    title: 'NFC Asceptic', url: 'https://milnefruit.com/images/specsheets/specifications/Milne_BlueberryPureeNFCAsepOrganicSpec.pdf'
  }], description: 'Blueberries are an icon of wellness based on their high concentrations of Vitamins C and K, polyphenols, antioxidants, and offer 14% of daily recommended fiber intake in just one cup. They also have properties known to reduce the risk of diabetes, and provide the essential mineral manganese which plays a role in bone development.'},
  {'name': 'Cherry', 'brix': 20, 'image': require('../../assets/fruits/cherry.png'),
  'juiceTypes': [{
    title: '68 Brix', url: 'https://milnefruit.com/images/specsheets/specifications/Milne_CherryDSJuice68BrixSpec.pdf'
  }, {
    title: 'NFC', url: 'https://milnefruit.com/images/specsheets/specifications/Milne_CherryDSJuiceNFCSpec.pdf'
  }],'pureeTypes':[{
    title: '32 Brix', url: 'https://milnefruit.com/images/specsheets/specifications/Milne_CherryDSPuree32BrixSpec.pdf'
  }, {
    title: 'NFC Asceptic', url: 'https://milnefruit.com/images/specsheets/specifications/Milne_CherryDSPureeNFCAsepSpec.pdf'
  }], description: 'Popular as a dessert item, fresh cherries cherries are low fat, low calorie and have no cholesterol and sodium. They also offer polyphenols, antioxidants, high Vitamin C levels, and serve as a natural source of melatonin, which possibly supports better sleep rhythms.'},
  {'name': 'Cranberry', 'brix': 7.4,'image': require('../../assets/fruits/cranberry.png'),
  'juiceTypes': [{
    title: '50 Brix', url: 'https://milnefruit.com/images/specsheets/specifications/Milne_CranberryJuice50BrixSpecR.pdf'
  }],'pureeTypes':[{
    title: '23 Brix', url: 'https://milnefruit.com/images/specsheets/specifications/Milne_CranberryPuree23BrixSpec.pdf'
  }], description: 'This tangy native fruit contains extremely high antioxidant levels, dietary fibers, zero fat and cholesterol, and are low in calories and sodium. Although traditionally consumed as a juice cocktail or holiday sauce, raw cranberries rank among the fruits richest in Vitamin C and manganese, and may have anti-inflammatory, cardiovascular, digestive and urinary tract benefits.'},
  {'name': 'Cucumber', 'brix': 3.0, 'image': require('../../assets/fruits/cucumber.png'),
  'juiceTypes': [{
    title: '68 Brix', url: 'https://milnefruit.com/images/specsheets/specifications/Milne_ConcordGrapeJuice68BrixSpec.pdf'
  }],'pureeTypes':[{
    title: '45 Brix', url: 'https://milnefruit.com/images/specsheets/specifications/Milne_ConcordGrapePuree45BrixSpec.pdf'
  }], description: 'Cucumbers have an extremely high water content, are a good source of Vitamin K, provide low levels of sodium and calories, and are fat and cholesterol free. Known for their cool and refreshing taste, cucumber ingredients are also favored in aroma applications such as essential oils and cosmetics.'},
  // {'name': 'Currant', 'brix': 11.0, 'image': require('../../assets/fruits/currant.png'), 'juiceTypes': [],'pureeTypes':[], description: 'Black currants add rich flavor and nutrients to a variety of health and wellness products. Their many health benefits include extremely high Vitamin C levels, antioxidants, other essential vitamins, and plenty of dietary minerals.'},
  {'name': 'Grape', 'brix': 16.0, 'image': require('../../assets/fruits/grape.png'),
  'juiceTypes': [{
    title: '68 Brix', url: 'https://milnefruit.com/images/specsheets/specifications/Milne_ConcordGrapeJuice68BrixSpec.pdf'
  }],'pureeTypes':[{
    title: '45 Brix', url: 'https://milnefruit.com/images/specsheets/specifications/Milne_ConcordGrapePuree45BrixSpec.pdf'
  }], description: 'With an abundance of wholesome nutrients, grapes are popular as fresh fruit, raisins, juice and extracts and have zero cholesterol or fat. Just one cup, with about 100 calories, provides more than a quarter of the daily recommended values of Vitamins K and C, and is also rich in essential minerals, polyphenols, and antioxidants.'},
  {'name': 'Kiwi', 'brix': 15.4, 'image': require('../../assets/fruits/kiwi.png'),
  'juiceTypes': [{
    title: '65 Brix', url: 'https://milnefruit.com/images/specsheets/specifications/Milne_KiwiJuice65BrixSpec.pdf'
  }],'pureeTypes':[{
    title: 'NFC', url: 'https://milnefruit.com/images/specsheets/specifications/Milne_KiwiPureeNFCSpec.pdf'
  }], description: 'Kiwi fruit offers a unique tropical tart flavor and 21% of the recommended daily intake of fiber. The fruit contains a peptide called kissper with potential as an anti-inflammatory agent, and is packed with polyphenols, antioxidants, and extremely high levels of Vitamins C and K.'},
  {'name': 'Peach', 'brix': 10.5, 'image': require('../../assets/fruits/peach.png'),
  'juiceTypes': [{
    title: '68 Brix', url: 'https://milnefruit.com/images/specsheets/specifications/Milne_PeachJuice68BrixSpec.pdf'
  }],'pureeTypes':[{
    title: 'NFC', url: 'https://milnefruit.com/images/specsheets/specifications/Milne_PeachPureeNFCSpec.pdf'
  }], description: 'Peaches are one of the world\'s most popular fruits with rich, succulent flavor and many beneficial vitamins and minerals. Peaches have about the same polyphenol content and twice the vitro antioxidant capacity as red grapes, and lack cholesterol, sodium, and saturated fat.'},
  {'name': 'Plum', 'brix': 14.3, 'image': require('../../assets/fruits/plum.png'),
  'juiceTypes': [{
    title: '68 Brix', url: 'https://milnefruit.com/images/specsheets/specifications/Milne_PlumJuice68BrixSpec.pdf'
  }],'pureeTypes':[{
    title: 'NFC', url: 'https://milnefruit.com/images/specsheets/specifications/Milne_PlumPureeNFCSpec.pdf'
  }], description: 'Plums have a well-earned reputation for containing significant dietary fiber with zero cholesterol and sodium. In addition to high vitamin C levels, polyphenols, and antioxidants, plums are under research for potential effects benefiting gastrointestinal health or lowering risk of colon cancer.'},
  {'name': 'Pomegranate', 'brix': 16.0, 'image': require('../../assets/fruits/pomegranate.png'),
  'juiceTypes': [{
    title: '65 Brix', url: 'https://milnefruit.com/images/specsheets/specifications/Milne_PomegranateJuice65BrixSpec.pdf'
  }],'pureeTypes':[{
    title: 'NFC', url:'https://milnefruit.com/images/specsheets/specifications/Milne_PomegranateJuiceNFCSpec.pdf'
  }], description: 'Pomegranate arils (seeds coated with juice) are an exotic fruit offering supplement opportunities for food, beverage and wellness products. They provide a good source of Vitamin A, Vitamin C and Vitamin K, minerals such potassium, copper, manganese and magnesium, and may have properties which inhibit inflammation.'},
  {'name': 'Pumpkin', 'brix': 8.0, 'image': require('../../assets/fruits/pumpkin.png'),
  'juiceTypes': [{
    title: '40 Brix', url: 'https://milnefruit.com/images/specsheets/specifications/Milne_PumpkinJuice40BrixSpec.pdf'
  }],'pureeTypes':[], description: 'The distinctive orange pumpkin goes hand in hand with Halloween and fall desserts, and is an excellent source of antioxidant Vitamin A. Pumpkins are a source of plant proteins, essential minerals, and its seed extracts are being researched for potentially inhibiting the onset of breast cancer.'},
  {'name': 'Purple Cabbage', 'brix': 3.0, 'image': require('../../assets/fruits/purple-cabbage.png'),
  'juiceTypes': [{
    title: '70 Brix', url: 'https://milnefruit.com/images/specsheets/specifications/Milne_PurpleCabbageJuice70BrixSpec.pdf'
  }],'pureeTypes':[], description: ''},
  {'name': 'Raspberry (Red)', 'brix': 9.2, 'image': require('../../assets/fruits/raspberry.png'),
  'juiceTypes': [{
    title: '65 Brix', url: 'https://milnefruit.com/images/specsheets/specifications/Milne_RRaspberryJuice65BrixSpec.pdf'
  }],'pureeTypes':[{
    title: '28 Brix', url: 'https://milnefruit.com/images/specsheets/specifications/Milne_RRaspberryPuree28BrixSpec.pdf'
  }], description: ''},
  {'name': 'Beet (Red)', 'brix': 8.0, 'image': require('../../assets/fruits/red-beet.png'),
  'juiceTypes': [{
    title: '70 Brix', url: 'https://milnefruit.com/images/specsheets/specifications/Milne_RedBeetJuice70BrixSpec.pdf'
  }],'pureeTypes':[], description: ''},
  {'name': 'Strawberry', 'brix': 8.0, 'image': require('../../assets/fruits/strawberry.png'),
  'juiceTypes': [{
    title: '50 Brix', url: 'https://milnefruit.com/images/specsheets/specifications/Milne_StrawberryJuice50BrixSpec.pdf'
  }],'pureeTypes':[{
    title: '28 Brix', url: 'https://milnefruit.com/images/specsheets/specifications/Milne_StrawberryPuree28BrixSpec.pdf'
  }], description: ''},
  {'name': 'Watermelon', 'brix': 7.8, 'image': require('../../assets/fruits/watermelon.png'),
  'juiceTypes': [{
    title: '65 Brix', url: 'https://milnefruit.com/images/specsheets/specifications/Milne_WatermelonJuice65BrixClarifiedSpec.pdf'
  }],'pureeTypes':[], description: ''}
]
