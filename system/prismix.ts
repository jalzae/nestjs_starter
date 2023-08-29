import * as fs from 'fs';

const baseFolder = './prisma/';

function capitalizeFirstLetter(input: string): string {
  if (input.length === 0) {
    return input;
  }

  return input[0].toUpperCase() + input.slice(1);
}

async function generate(model: string) {
  try {

    const data = await fs.promises.readFile('prismix.config.json', 'utf-8');
    const packageJson = JSON.parse(data);
    packageJson.mixers[0].input.push(`${baseFolder}${model}.prisma`)
    await fs.promises.writeFile(
      'prismix.config.json',
      JSON.stringify(packageJson),
    );

    await fs.promises.writeFile(`${baseFolder}${model}.prisma`, `
    datasource db {
      provider = "mysql"
      url      = ""
    }
    
    model ${capitalizeFirstLetter(model)} { 
      id        String   @id @default(uuid())
       @@map("${model}s")}`);

    console.log('Package.json has been updated.');
  } catch (error) {
    console.error('Error:', error);
  }
}

try {
  const argument = process.argv[2];
  console.log(argument)
  if (argument) {
    generate(argument);
  } else {
    throw 'Argument not found';
  }
} catch (e) {
  console.log("Something wrong:" + e)
}
