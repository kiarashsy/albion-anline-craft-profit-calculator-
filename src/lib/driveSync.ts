import { UserStats, Achievement } from '../types';

export const FILE_NAME = 'albion_craft_master_pro_backup.json';

export async function uploadStatsToDrive(
  accessToken: string,
  stats: UserStats,
  achievements: Achievement[]
): Promise<void> {
  const fileContent = JSON.stringify({ stats, achievements }, null, 2);
  const metadata = {
    name: FILE_NAME,
    mimeType: 'application/json',
    parents: ['appDataFolder']
  };

  // 1. Check if file exists in appDataFolder
  const query = encodeURIComponent(`name='${FILE_NAME}' and 'appDataFolder' in parents and trashed=false`);
  const searchRes = await fetch(`https://www.googleapis.com/drive/v3/files?q=${query}&spaces=appDataFolder`, {
    headers: { Authorization: `Bearer ${accessToken}` }
  });

  if (!searchRes.ok) {
    throw new Error('Failed to query Drive');
  }

  const searchData = await searchRes.json();
  const existingFile = searchData.files && searchData.files.length > 0 ? searchData.files[0] : null;

  const form = new FormData();
  form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
  form.append('file', new Blob([fileContent], { type: 'application/json' }));

  let url = 'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart';
  let method = 'POST';

  if (existingFile) {
    url = `https://www.googleapis.com/upload/drive/v3/files/${existingFile.id}?uploadType=multipart`;
    method = 'PATCH';
  }

  const res = await fetch(url, {
    method,
    headers: { Authorization: `Bearer ${accessToken}` },
    body: form
  });

  if (!res.ok) {
    throw new Error('Failed to upload to Drive');
  }
}

export async function downloadStatsFromDrive(
  accessToken: string
): Promise<{ stats: UserStats, achievements: Achievement[] } | null> {
  const query = encodeURIComponent(`name='${FILE_NAME}' and 'appDataFolder' in parents and trashed=false`);
  const searchRes = await fetch(`https://www.googleapis.com/drive/v3/files?q=${query}&spaces=appDataFolder`, {
    headers: { Authorization: `Bearer ${accessToken}` }
  });

  if (!searchRes.ok) {
    throw new Error('Failed to query Drive');
  }

  const searchData = await searchRes.json();
  const existingFile = searchData.files && searchData.files.length > 0 ? searchData.files[0] : null;

  if (!existingFile) {
    return null; // No backup found
  }

  const downloadRes = await fetch(`https://www.googleapis.com/drive/v3/files/${existingFile.id}?alt=media`, {
    headers: { Authorization: `Bearer ${accessToken}` }
  });

  if (!downloadRes.ok) {
    throw new Error('Failed to download from Drive');
  }

  const data = await downloadRes.json();
  return {
    stats: data.stats,
    achievements: data.achievements || []
  };
}
