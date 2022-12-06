import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '~/server/db/client';

const getUrl = async (req: NextApiRequest, res: NextApiResponse) => {
  const slug = req.query['slug'];

  if (!slug || typeof slug !== 'string') {
    res.status(404).json({ error: 'Please use with a slug.' });

    return;
  }

  const data = await prisma.link.findFirst({
    where: { slug: { equals: slug } },
  });

  if (!data) {
    res.status(404).json({ error: 'slug not found' });

    return;
  }

  await prisma.link.update({
    where: { id: data?.id },
    data: {
      ...data,
      clicks: data.clicks + 1,
      clicksUpdatedAt: new Date().toISOString(),
    },
  });

  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-maxage=1000000000, stale-while-revalidate');

  return res.status(200).json(data);
};

export default getUrl;
