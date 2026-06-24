/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import './index.scss';

import { Image } from 'aesirx-uikit';

import DamStore from 'store/DamStore/DamStore';
import storage from './storage.svg';

function formatBytes(bytes, decimals = 2) {
  if (!+bytes) return { usageValue: 0, usageType: 'MB' };

  const k = 1000;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return {
    usageValue: parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) ?? 0,
    usageType: sizes[i] ?? 'KB',
  };
}

const Storage = () => {
  const [usage, setUsage] = useState({ usageValue: 0, usageType: 'MB' });
  const { t } = useTranslation();

  const loadUsage = async () => {
    try {
      const store = new DamStore();
      const detail = await store.getSubscription();
      const used = Number(detail?.storage_usage ?? 0);
      setUsage(formatBytes(used));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadUsage();
    return () => {};
  }, []);

  return (
    <div className={`damstorage w-100 mb-3 px-3 py-3`}>
      <p className="mb-0">
        <Image src={storage} />
        <span className="text-white ps-3">{t('txt_storage')}</span>
      </p>
      <p className="mb-0 mt-2 d-flex flex-wrap">
        <span className="text-white fs-14">
          {usage.usageValue}
          {usage.usageType} {t('txt_used')}
        </span>
      </p>
    </div>
  );
};

export default Storage;
