require('dotenv').config()

const { Client } = require('@notionhq/client');

const notion = new Client({ auth: process.env.NOTION_API_KEY });

(async () => {
  const databaseId = process.env.NOTION_DATABASE_ID;
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
        or: [
        //   {
        //     property: "Name",
        //     rich_text: {
        //         contains: "a"
        // }
            
        //   },
        {
            property: 'class',
            select: {
                equals: "m",
            }
        }
        ],
    },
    // sorts: [
    //   {
    //     property: 'marks',
    //     direction: 'ascending',
    //   },
    // ],
  });
  console.log(response.results[0].properties.marks.number);
})();


// require('dotenv').config()

// const { Client } = require('@notionhq/client');

// const notion = new Client({ auth: process.env.NOTION_API_KEY });

// (async () => {
//   const databaseId = process.env.NOTION_DATABASE_ID;
//   const response = await notion.databases.query({
//     database_id: databaseId,
//     filter: {
//           property: 'class',
//           equals: "m",
//     },
    
//     sorts: [
//       {
//         property: 'marks',
//         direction: 'ascending',
//       },
//     ],
//   });
//   console.log(response);
// })();