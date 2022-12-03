const copyToClipboard = async (text: string) => {
  try {
    const clipboardItem = new ClipboardItem({
      'text/plain': new Blob([text], { type: 'text/plain' }),
    });

    await navigator.clipboard.write([clipboardItem]);
  } catch (error) {
    await navigator.clipboard.writeText(text);
  }
};

export default copyToClipboard;
