import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { trackDownload } from './analytics';

export function formatDateString() {
  const date = new Date();
  return date.toISOString().split('T')[0];
}

export const exportToZip = async (
  csvData: string,
  imagePath: string,
  reactorName: string
) => {
  try {
    const zip = new JSZip();
    
    const dateStr = formatDateString();
    const csvFileName = `${reactorName.toLowerCase().replace(/\s+/g, '-')}-analysis-${dateStr}.csv`;
    zip.file(csvFileName, csvData);
    
    const imageUrl = `${process.env.NEXT_PUBLIC_BASE_PATH || ""}${imagePath}`;
    const response = await fetch(imageUrl);
    const imageBlob = await response.blob();
    const imageName = `${reactorName.toLowerCase().replace(/\s+/g, '-')}-diagram.png`;
    zip.file(imageName, imageBlob);
    
    const zipBlob = await zip.generateAsync({ type: "blob" });
    
    const zipFileName = `${reactorName.toLowerCase().replace(/\s+/g, '-')}-analysis-${dateStr}.zip`;
    saveAs(zipBlob, zipFileName);
    
    trackDownload("zip", zipFileName);
    
    return true;
  } catch (error) {
    console.error("Error creating zip file:", error);
    return false;
  }
};