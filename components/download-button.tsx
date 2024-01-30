"use client"

import { useState } from 'react';
import axios from 'axios';
import { Button } from './ui/button';
import { DownloadCloud, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const DownloadButton = ({
    url
}: {
    url: string
}) => {
    const [isDownloading, setIsDownloading] = useState(false);

    const handleDownload = async () => {
        try {
            setIsDownloading(true);
            const response = await axios.get(url, { responseType: 'blob' });

            // Create a blob from the response data
            const blob = new Blob([response.data], { type: response.headers['content-type'] });

            // Create a link element
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = 'downloaded_image.png';

            // Append the link to the document and trigger a click
            document.body.appendChild(link);
            link.click();

            // Remove the link from the document
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error downloading image:', error);
        } finally {
            setIsDownloading(false);
        }
    };
  return (
    <Button
        onClick={handleDownload}
        variant='ghost'
        disabled={isDownloading}
        className='flex gap-1 pr-5'
    >
        <DownloadCloud className={cn("w-5 h-5", isDownloading && "hidden")} />
        <Loader2 className={cn("animate-spin w-5 h-5 hidden", isDownloading && "flex")} />
        Download
    </Button>
  )
}

export default DownloadButton;
