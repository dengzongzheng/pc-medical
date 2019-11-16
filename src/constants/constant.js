const copyright = '2019 三穗卫生监督';
const footerLinks = [
  {
    key: '国家卫生监督',
    title: '国家卫生监督',
    href: 'https://www.jdzx.net.cn/',
    blankTarget: true,
  },
];

const organizationsCheckBoxes = [
  {
    label: '公共机构',
    value: 1,
  },
  {
    label: '学校',
    value: 2,
  },
  {
    label: '医疗机构',
    value: 3,
  },
  {
    label: '供水单位',
    value: 4,
  },
  {
    label: '监督协管',
    value: 5,
  },
];

const organizations = [
  {
    organization_name: '公共机构',
    organization_code: 1,
    industries: [
      {
        code: 1,
        name: '住宿业',
      },
      {
        code: 2,
        name: '美容店',
      },
      {
        code: 3,
        name: '理发店',
      },
      {
        code: 4,
        name: '公共浴室',
      },
      {
        code: 5,
        name: '商场',
      },
    ],
  },
  {
    organization_code: 2,
    organization_name: '学校',
    industries: [],
  },
  {
    organization_code: 3,
    organization_name: '医疗机构',
    industries: [
      {
        code: 1,
        name: '传染病防控',
      },
      {
        code: 2,
        name: '放射卫生',
      },
      {
        code: 3,
        name: '依法执业',
      },
    ],
  },
  {
    organization_code: 4,
    organization_name: '供水单位',
    industries: [],
  },
  {
    organization_code: 5,
    organization_name: '监督协管',
    industries: [],
  },
];

const exports = {
  copyright,
  footerLinks,
  organizations,
  organizationsCheckBoxes,
};
export default exports;
