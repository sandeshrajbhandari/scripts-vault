require("dotenv").config();

const { Client } = require("@notionhq/client");

const notion = new Client({ auth: process.env.NOTION_API_KEY });

async function findTotal(kva, type) {
  const databaseId = process.env.NOTION_DATABASE_ID_METAL;
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: "KVA",
      select: {
        equals: kva,
      },
    },
  });
  let sum = 0;
  //response.results.map((item) => sum = sum + (item.properties.marks.number))
  //console.log(response.results[1].properties.Output.number);
  //console.log(response.results.length)
  response.results.forEach(
    (item) => (sum = sum + item.properties.Output.number)
  );
  //console.log(sum)
  return sum;
}

async function kvaTable() {
  let kva = ["300", "200", "100", "50", "90/15", "25", "140/50"];
  let type = ["Tank Cover", "Tank", "Conservator"];
  // console.log(await findTotal("300", "Tank Cover"))
  console.log("KVA | Tank Cover | Tank | Conservator");
  //using forEach with await doesn't work.
  // await kva.forEach(async (kvaI,i1) => {
  //     process.stdout.write(kvaI + " | ");
  //     await type.forEach(async (typeI,i2) => {
  //         let total= await findTotal(kvaI,typeI);
  //         process.stdout.write (` ${String(total)} | `)
  //         //findTotal(kvaI,typeI).then((o)=> process.stdout.write (` ${String(o)} | `));

  //     })
  //     console.log("");//new line
  // })
  for (let i = 0; i < kva.length; i++) {
    process.stdout.write(kva[i] + " | ");
    for (let j = 0; j < type.length; j++) {
      let total = await findTotal(kva[i], type[j]);
      process.stdout.write(` ${String(total)} | `);
    }
    console.log();
  }
}
kvaTable();
// (async function test() {
//     console.log("TEST 1")
//     console.log (await findTotal("300", "Tank"));
//     console.log("done");
// })();

// findTotal("90/15", "Conservator").then(function(result) {
//     console.log(result) // "Some User token"
//  })
