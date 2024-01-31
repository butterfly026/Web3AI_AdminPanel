import { getImgUrl, MyEnumTag } from '@/common';
import { YesOrNoEnum } from '@/enums';
import { ProFormSwitch } from '@ant-design/pro-components';
import { Avatar, Descriptions, Image, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { Link, request, useOutletContext, useParams } from 'umi';
let itemDet: any = {};

const FALLBACK_IMG =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3PTWBSGcbGzM6GCKqlIBRV0dHRJFarQ0eUT8LH4BnRU0NHR0UEFVdIlFRV7TzRksomPY8uykTk/zewQfKw/9znv4yvJynLv4uLiV2dBoDiBf4qP3/ARuCRABEFAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghgg0Aj8i0JO4OzsrPv69Wv+hi2qPHr0qNvf39+iI97soRIh4f3z58/u7du3SXX7Xt7Z2enevHmzfQe+oSN2apSAPj09TSrb+XKI/f379+08+A0cNRE2ANkupk+ACNPvkSPcAAEibACyXUyfABGm3yNHuAECRNgAZLuYPgEirKlHu7u7XdyytGwHAd8jjNyng4OD7vnz51dbPT8/7z58+NB9+/bt6jU/TI+AGWHEnrx48eJ/EsSmHzx40L18+fLyzxF3ZVMjEyDCiEDjMYZZS5wiPXnyZFbJaxMhQIQRGzHvWR7XCyOCXsOmiDAi1HmPMMQjDpbpEiDCiL358eNHurW/5SnWdIBbXiDCiA38/Pnzrce2YyZ4//59F3ePLNMl4PbpiL2J0L979+7yDtHDhw8vtzzvdGnEXdvUigSIsCLAWavHp/+qM0BcXMd/q25n1vF57TYBp0a3mUzilePj4+7k5KSLb6gt6ydAhPUzXnoPR0dHl79WGTNCfBnn1uvSCJdegQhLI1vvCk+fPu2ePXt2tZOYEV6/fn31dz+shwAR1sP1cqvLntbEN9MxA9xcYjsxS1jWR4AIa2Ibzx0tc44fYX/16lV6NDFLXH+YL32jwiACRBiEbf5KcXoTIsQSpzXx4N28Ja4BQoK7rgXiydbHjx/P25TaQAJEGAguWy0+2Q8PD6/Ki4R8EVl+bzBOnZY95fq9rj9zAkTI2SxdidBHqG9+skdw43borCXO/ZcJdraPWdv22uIEiLA4q7nvvCug8WTqzQveOH26fodo7g6uFe/a17W3+nFBAkRYENRdb1vkkz1CH9cPsVy/jrhr27PqMYvENYNlHAIesRiBYwRy0V+8iXP8+/fvX11Mr7L7ECueb/r48eMqm7FuI2BGWDEG8cm+7G3NEOfmdcTQw4h9/55lhm7DekRYKQPZF2ArbXTAyu4kDYB2YxUzwg0gi/41ztHnfQG26HbGel/crVrm7tNY+/1btkOEAZ2M05r4FB7r9GbAIdxaZYrHdOsgJ/wCEQY0J74TmOKnbxxT9n3FgGGWWsVdowHtjt9Nnvf7yQM2aZU/TIAIAxrw6dOnAWtZZcoEnBpNuTuObWMEiLAx1HY0ZQJEmHJ3HNvGCBBhY6jtaMoEiJB0Z29vL6ls58vxPcO8/zfrdo5qvKO+d3Fx8Wu8zf1dW4p/cPzLly/dtv9Ts/EbcvGAHhHyfBIhZ6NSiIBTo0LNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiEC/wGgKKC4YMA4TAAAAABJRU5ErkJggg==';
export default () => {
  const params = useParams();
  let masterProps: any = useOutletContext();
  const [item, setItem] = useState<any>({});
  const [getIdentityStatus, setIdentityStatus] = useState(false);
  const [getProfileStatus, setProfileStatus] = useState(false);

  useEffect(() => {
    itemDet = masterProps.model;
    setIdentityStatus(masterProps?.model?.identity_status == 3 ? true : false);
    setProfileStatus(masterProps?.model?.profile_status == 3 ? true : false);
    setItem(masterProps.model);
  }, [masterProps]);

  const getDet = () => {
    request('users/show', {
      data: { id: params.id },
    }).then((res) => {
      itemDet = res.data.model;
      setItem(res.data.model);
    });
  };

  return (
    <>
      <Descriptions
        bordered
        title='Basic'
        size='small'
        column={3}
        labelStyle={{ width: '200px' }}
      >
        <Descriptions.Item label='Address' span={2}>
          {item?.platform}：
          <Typography.Text copyable>{item?.address}</Typography.Text>
        </Descriptions.Item>
        <Descriptions.Item label='Invite code'>
          <Typography.Text copyable>{item?.invite_code}</Typography.Text>
        </Descriptions.Item>
        <Descriptions.Item label='VIP' span={2}>
          {item?.vip?.name}
        </Descriptions.Item>
        <Descriptions.Item label='Account Proxy'>
          {item?.username}
        </Descriptions.Item>
      </Descriptions>
      <Descriptions
        bordered
        title='Referrals'
        size='small'
        style={{ marginTop: '2rem' }}
        column={3}
        labelStyle={{ width: '200px' }}
      >
        <Descriptions.Item label='Referral url' span={3}>
          {item?.referral_url ?? '-'}
        </Descriptions.Item>
        <Descriptions.Item label='Parent1'>
          <Link to={`/users/users/${item?.parent_1?.id}/details`}>
          <Avatar src={getImgUrl(item?.parent_1?.avatar)} />{' '}
          </Link>
          {item?.parent_1?.full_name}
        </Descriptions.Item>
        <Descriptions.Item label='Parent1' span={2}>
          {item?.parent_1?.address ?? '-'}
        </Descriptions.Item>
        <Descriptions.Item label='Parent2'>
          <Link to={`/users/users/${item?.parent_2?.id}/details`}>
          <Avatar src={getImgUrl(item?.parent_2?.avatar)} />{' '}
          </Link>
          {item?.parent_2?.full_name}
        </Descriptions.Item>
        <Descriptions.Item label='Parent2' span={2}>
          {item?.parent_2?.address ?? '-'}
        </Descriptions.Item>
        <Descriptions.Item label='Parent3'>
          <Link to={`/users/users/${item?.parent_3?.id}/details`}>
          <Avatar src={getImgUrl(item?.parent_3?.avatar)} />{' '}
          </Link>
          {item?.parent_3?.full_name}
        </Descriptions.Item>
        <Descriptions.Item label='Parent3' span={2}>
          {item?.parent_3?.address ?? '-'}
        </Descriptions.Item>
      </Descriptions>
      <Descriptions
        bordered
        title={
          <>
            Email
            <MyEnumTag
              items={YesOrNoEnum}
              value={item?.email_verified_at === null ? 0 : 1}
            />
          </>
        }
        size='small'
        style={{ marginTop: '2rem' }}
        column={3}
        labelStyle={{ width: '200px' }}
      >
        <Descriptions.Item label='Email'>
          {item?.email ?? '-'}
        </Descriptions.Item>
        <Descriptions.Item label='Email verified' span={2}>
          {item?.email_verified_at ?? '-'}
        </Descriptions.Item>
      </Descriptions>
      <Descriptions
        bordered
        title={
          <>
            Profile
            <MyEnumTag
              items={YesOrNoEnum}
              value={item?.profile_verified_at === null ? 0 : 1}
            />
          </>
        }
        extra={
          item?.profile_status == 2 ? (
            <ProFormSwitch
              checkedChildren='Pass'
              unCheckedChildren='Close'
              fieldProps={{
                checked: getProfileStatus,
                onClick: (e) => {
                  request('users/update', {
                    data: {
                      id: itemDet?.id,
                      profile_status: e ? 3 : 1,
                    },
                  })
                    .then((res) => {
                      getDet();
                      setIdentityStatus(true);
                    })
                    .catch((e) => {
                      setIdentityStatus(false);
                    });
                  console.log(e);
                },
              }}
            />
          ) : (
            ''
          )
        }
        size='small'
        style={{ marginTop: '2rem' }}
        column={3}
        labelStyle={{ width: '200px' }}
        contentStyle={{ width: '400px' }}
      >
        <Descriptions.Item label='Avatar'>
          <Image
            width={100}
            src={getImgUrl(item?.avatar)}
            fallback={FALLBACK_IMG}
          />
        </Descriptions.Item>
        <Descriptions.Item label='NickName'>
          {item?.nickname ?? '-'}
        </Descriptions.Item>
        <Descriptions.Item label='Profile Verified'>
          {item?.profile_verified_at ?? '-'}
        </Descriptions.Item>
        <Descriptions.Item label='Phone Number' span={3}>
          {item?.phone_number ?? '-'}
        </Descriptions.Item>
        <Descriptions.Item label='Bio' span={3}>
          {item?.bio ?? '-'}
        </Descriptions.Item>
        <Descriptions.Item label='Facebook'>
          {item?.facebook ?? '-'}
        </Descriptions.Item>
        <Descriptions.Item label='Telegram'>
          {item?.telegram ?? '-'}
        </Descriptions.Item>
        <Descriptions.Item label='Wechat'>
          {item?.wechat ?? '-'}
        </Descriptions.Item>
        <Descriptions.Item label='Skype'>
          {item?.skype ?? '-'}
        </Descriptions.Item>
        <Descriptions.Item label='Whatsapp'>
          {item?.whatsapp ?? '-'}
        </Descriptions.Item>
        <Descriptions.Item label='Line'>{item?.line ?? '-'}</Descriptions.Item>
        <Descriptions.Item label='Zalo'>{item?.zalo ?? '-'}</Descriptions.Item>
      </Descriptions>
      <Descriptions
        bordered
        title={
          <>
            Identity
            <MyEnumTag
              items={YesOrNoEnum}
              value={item?.identity_verified_at === null ? 0 : 1}
            />
          </>
        }
        extra={
          item?.identity_status == 2 ? (
            <ProFormSwitch
              checkedChildren='Pass'
              unCheckedChildren='Close'
              fieldProps={{
                checked: getIdentityStatus,
                onClick: (e) => {
                  request('users/update', {
                    data: {
                      id: itemDet?.id,
                      identity_status: e ? 3 : 1,
                    },
                  })
                    .then((res) => {
                      getDet();
                      setIdentityStatus(true);
                    })
                    .catch((e) => {
                      setIdentityStatus(false);
                    });
                  console.log(e);
                },
              }}
            />
          ) : (
            ''
          )
        }
        size='small'
        style={{ marginTop: '2rem' }}
        column={3}
        labelStyle={{ width: '200px' }}
        contentStyle={{ width: '400px' }}
      >
        <Descriptions.Item label='ID Verified'>
          {item?.identity_verified_at}
        </Descriptions.Item>
        <Descriptions.Item label='Full Name'>
          {item?.full_name}
        </Descriptions.Item>
        <Descriptions.Item label='ID No.'>
          {item?.id_no ?? '-'}
        </Descriptions.Item>
        <Descriptions.Item label='Country'>
          {item?.country ?? '-'}
        </Descriptions.Item>
        <Descriptions.Item label='City'>{item?.city ?? '-'}</Descriptions.Item>
        <Descriptions.Item label='Self Photo'>
          <Image
            width={100}
            src={getImgUrl(item?.self_photo_img)}
            fallback={FALLBACK_IMG}
          />
        </Descriptions.Item>
        <Descriptions.Item label='ID Front Img'>
          <Image
            width={100}
            src={getImgUrl(item?.id_front_img)}
            fallback={FALLBACK_IMG}
          />
        </Descriptions.Item>
        <Descriptions.Item label='ID Reverse Img'>
          <Image
            width={100}
            src={getImgUrl(item?.id_reverse_img)}
            fallback={FALLBACK_IMG}
          />
        </Descriptions.Item>
      </Descriptions>
    </>
  );
};
