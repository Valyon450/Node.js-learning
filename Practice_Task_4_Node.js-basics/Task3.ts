import * as fs from 'fs';
import * as path from 'path';
import axios from 'axios';

interface Link {
  url: string;
}

async function saveHtmlContent(link: Link, folderName: string) {
  try {
    const response = await axios.get(link.url);
    const { data } = response;

    const fileName = path.basename(link.url);
    const filePath = path.join(folderName, `${fileName}.html`);

    fs.writeFileSync(filePath, data);
    console.log(`Saved HTML content for ${link.url} at ${filePath}`);
  } catch (error) {
    console.error(`Failed to fetch HTML content for ${link.url}:`, error);
  }
}

function createFolder(folderName: string) {
  try {
    fs.mkdirSync(folderName);
    console.log(`Created folder: ${folderName}`);
  } catch (error) {
    console.error(`Failed to create folder: ${folderName}`, error);
    process.exit(1);
  }
}

function analyzeLinks(jsonFilePath: string) {
  try {
    const jsonData = fs.readFileSync(jsonFilePath, 'utf-8');
    const links: Link[] = JSON.parse(jsonData);

    const folderName = path.basename(jsonFilePath, '.json') + '_pages';
    createFolder(folderName);

    for (const link of links) {
      saveHtmlContent(link, folderName);
    }
  } catch (error) {
    console.error(`Failed to analyze links:`, error);
    process.exit(1);
  }
}

// Check if the command line argument is provided
if (process.argv.length !== 3) {
  console.error('Please provide the path to the JSON file.');
  process.exit(1);
}

const jsonFilePath = process.argv[2];
analyzeLinks(jsonFilePath);
