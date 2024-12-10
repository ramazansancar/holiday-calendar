import React, { useEffect, useState } from 'react';
import { Form as RSuiteForm, SelectPicker, CheckPicker } from 'rsuite';
import 'rsuite/dist/rsuite-no-reset.min.css';

import { Badge, Calendar, ConfigProvider, Divider, Space, Button, Card, Flex, Typography, List, Checkbox, Form } from 'antd';
import type { CalendarProps } from 'antd';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Icon } from "@iconify/react";

import tr_TR from '@/locales/tr_TR';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import 'dayjs/locale/tr';
dayjs.locale('tr');
dayjs.extend(utc);
dayjs.extend(timezone);

//import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { utils, writeFile } from 'xlsx';
import useSWR from 'swr'

//import holidayTypes from '@/constants/holidayTypes';
import countrys from '@/constants/countrys';
import filterList from '@/constants/filterList';
import { count } from 'console';

interface DataTypes {
  date: string;
  name: string;
  type: string;
  color: string;
  location: string;
  message?: string;
  data?: object;
}

const getListData = (value: Dayjs, info: any, country: string, data: any, mode: string) => {
  const listData: DataTypes[] = []; // Specify the type of listData
  const year = dayjs(value).year();
  const month = (dayjs(value).month() + 1).toString().padStart(2, '0');
  const day = dayjs(value).date();

  if(data?.length > 0) {
    for(const item of data) {
      if(mode === 'year' && dayjs(item?.date).format('YYYY-MM') === (`${year}-${month}`)) {
        listData.push(item);
      }else if(mode === 'month' && item?.date === `${year}-${month}-${day}`) {
        listData.push(item);
      }
    };
    return listData || [];
  }
};

const fetcher = (...args: [RequestInfo, RequestInit?]) => fetch(...args).then(res => res.json())
.then(resp => {
  if(resp?.status === 200) {
    return resp?.data.filter((v: any, i: any, a: any) => a.findIndex((t: any) => (t.date === v.date && t.name === v.name)) === i);
  } else {
    return { message: resp?.message };
  }
});

const excelDownload = (data: any, country: any) => {
  data = data.map((item: any) => {
    return {
      'Tarih': item?.date,
      'Tatil Adı': item?.name,
      'Tatil Türü': item?.type.charAt(0).toUpperCase() + item?.type.slice(1),
      'Konum': countrys.find((c: any) => c?.value === country)?.label,
    };
  }
  );
  const ws = utils.json_to_sheet(data);
  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, 'Sheet1');
  writeFile(wb, `holiday-calendar-${country}.xlsx`, { bookType: 'xlsx', type: 'buffer' });
};

/*const pdfDownload = async (data: any, country: any) => {
  // Yeni bir PDF oluştur
  const pdfDoc = await PDFDocument.create();

  // Yeni bir sayfa ekle
  const page = pdfDoc.addPage([600, 400]);

  // Yazı tipini ekle
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const { width, height } = page.getSize();
  const fontSize = 12;

  // Başlık ekle
  page.drawText('Holiday Calendar', {
    x: 50,
    y: height - 50,
    size: 20,
    font,
    color: rgb(0, 0.53, 0.71),
  });

  // JSON verilerini ekle
  let yPosition = height - 80;
  data.forEach((item: DataTypes) => {
    const text = `Tarih: ${item?.date}, Tatil Adı: ${item?.name}, Tatil Türü: ${item?.type}, Konum: ${item?.location}`;
    page.drawText(text, {
      x: 50,
      y: yPosition,
      size: fontSize,
      font,
      color: rgb(0, 0, 0),
    });
    yPosition -= 20;
  });

  // PDF'i byte array olarak al
  const pdfBytes = await pdfDoc.save();

  // PDF'i indirme için bir blob oluştur
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);

  // Kullanıcıya indirme işlemi sun
  const link = document.createElement('a');
  link.href = url;
  link.download = `holiday-calendar-${country}.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // URL'yi temizle
  URL.revokeObjectURL(url);
};*/

export default function Calendars() {
  const [date, setDate] = useState(() => dayjs() as Dayjs);
  const [country, setCountry] = React.useState('DE');
  const [mode, setMode] = React.useState('month');
  const [calendarData, setCalendarData] = React.useState<DataTypes[]>([]);
  const [filteredData, setFilteredData] = React.useState<DataTypes[]>([]);
  const [filters, setFilters] = React.useState<string[]>(filterList);
  const [download, setDownload] = React.useState<DataTypes[]>([]);

  const {
    data: data,
    error: error,
    isLoading: isLoading
  } = useSWR(`http://localhost:3001/api/dates/${date.year()}/${country}`, fetcher);

  useEffect(() => {
    if(error) {
      console.error('Error: ', error);
      toast.error(`Bir Hata Oluştu! - ${error}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    if(data?.message) {
      toast.error(`Bir Hata Oluştu! - ${data?.message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [error, data]);

  useEffect(() => {
    if(country && date) {
      setCalendarData((data || []));
    }
  }, [data, country, date]);

  useEffect(() => {
    if(!calendarData) return;
    if (!Array.isArray(calendarData) && 'message' in calendarData) return setFilteredData([]);
    if(filters.length === 0) return setFilteredData(calendarData);
    if(calendarData.length === 0) return setFilteredData([]);
    console.log('Filters: ', filters);
    console.log('Calendar Data: ', calendarData);
    //console.log('Filtered Data: ', filteredData);
    setFilteredData(calendarData?.filter((item) => item?.type && filters.includes(item?.type)));
  }, [filters, calendarData]);

  useEffect(() => {
    if(country && filters){
      setDownload([]);
    }
    if(!country){
      toast.error('Lütfen bir bölge seçin!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [country, filters]);

  const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>['mode'] = 'month') => {
    setDate(value);
    setMode(mode);
  };

  const onSelect = (value: Dayjs, selectInfo: any) => {
    console.log('onSelect', value.format('YYYY-MM-DD'), selectInfo);
    setDate(value);
  };

  /* Yearly */
  const monthCellRender = (value: Dayjs, info: any) => {
    const listData = getListData(value, info, country, filteredData, mode);
    return listData?.length ? (
      <div className="notes">
        <ul className="events">
        {listData && listData?.slice(0,3).map((item, index) => (
          <li key={index} title={item?.name}>
            <Badge color={item?.color} text={(`${item?.name} - ${item?.location}`).slice(0,25)} />
          </li>
        ))}
        { listData && listData?.length > 3 && <li className="font-bold">+{listData?.length-3}</li> }
        </ul>
      </div>
    ) : null;
  };

  /* Montly */
  const dateCellRender = (value: Dayjs, info: any) => {
    const listData = getListData(value, info, country, filteredData, mode);
    return listData?.length ? (
      <div className="notes">
      <ul className="events">
        {listData && listData.slice(0,3).map((item, index) => (
          <li key={index} title={item?.name}>
            <Badge color={item?.color} text={(`${item?.name} - ${item?.location}`).slice(0,25)} />
          </li>
        ))}
        { listData && listData?.length > 3 && <li className="font-bold">+{listData?.length-3}</li> }
        
      </ul>
      </div>
    ) : null;
  };

  const cellRender: CalendarProps<Dayjs>['cellRender'] = (current, info) => {
    if (info.type === 'date') return dateCellRender(current, info);
    if (info.type === 'month') return monthCellRender(current, info);
    return info.originNode;
  };

  return (
    <div>
        <h1>Takvim</h1>
        <RSuiteForm layout="inline">
          <RSuiteForm.Group controlId="selectPicker">
            <RSuiteForm.ControlLabel>Bölgenizi Seçin</RSuiteForm.ControlLabel>
            <RSuiteForm.Control
              name="selectPicker"
              accepter={SelectPicker}
              data={countrys}
              value={country}
              cleanable={false}
              onChange={(value: unknown, event: React.SyntheticEvent) => setCountry(value as string)}
            />
          </RSuiteForm.Group>
          <RSuiteForm.Group controlId="checkPicker">
            <RSuiteForm.ControlLabel>Filtre</RSuiteForm.ControlLabel>
            <RSuiteForm.Control
              name="checkPicker"
              accepter={CheckPicker}
              data={filterList.map((item: any) => ({
                label: item.charAt(0).toUpperCase() + item.slice(1),
                value: item
              }))}
              value={filters}
              onChange={(value: unknown, event: React.SyntheticEvent) => setFilters(value as string[])}
            />
          </RSuiteForm.Group>
        </RSuiteForm>

        <Form
          layout="inline"
          initialValues={{ layout: 'inline' }}
          style={{
            maxWidth: 'none',
            maxHeight: 200,
          }}
        >
          {/*<Button
            type="primary"
            style={{ marginRight: 10 }}
            onClick={() => pdfDownload(download, country)}
            disabled={download.length === 0}
            title={download.map((item) => item?.name).join(', ')}
          >
            <Icon icon="material-symbols:download" width="24" height="24" /> İndir (PDF)
          </Button>*/}
          <Button
            type="primary"
            style={{ marginRight: 10 }}
            onClick={() => excelDownload(download, country)}
            disabled={download.length === 0}
            title={download.map((item) => item?.name).join(', ')}
          >
            <Icon icon="mdi:download" width="24" height="24" /> İndir (Excel)
          </Button>
          <Button
            color="danger"
            variant="solid"
            style={{ marginRight: 10 }}
            onClick={() => {
              setDownload([]);
            }}
            disabled={download.length === 0}
            title={download.map((item) => item?.name).join(', ')}
          >
            <Icon icon="fluent-mdl2:remove-from-shopping-list" width="24" height="24" /> Listeyi Temizle
          </Button>
          <List
            itemLayout="vertical"
            dataSource={download}
            pagination={(download.length > 3) && {
              position: 'bottom',
              align: 'center',
              pageSize: 3,
            }}
            renderItem={(item, index) => (
              <List.Item>
                <Checkbox
                  checked={download.includes(item)}
                  onChange={(e) => {
                    if(e.target.checked) {
                      setDownload([...download, item]);
                    }else {
                      setDownload(download.filter((i) => i !== item));
                    }
                  }}
                >
                  <Badge color={item?.color} text={`${item?.name} - ${item?.location}`} />
                </Checkbox>
              </List.Item>
            )}
            locale={{ emptyText: 'İndirme listesi boş', }}
          />
        </Form>
        <Divider
          style={{
            margin: '10px 0',
          }}
        />
        <Card
          hoverable
          style={{
            width: '100%',
            //height: '100%',
            //padding: 0,
            //overflow: 'hidden',
          }}
          styles={{
            body: {
              padding: 0,
              overflow: 'hidden'
            }
          }}
        >
          <Flex justify="space-between">
            <ConfigProvider
              theme={{
                components: {
                  Calendar: {
                    fullBg: '#f0f2f5',
                    fullPanelBg: '#f0f2f5',
                    itemActiveBg: '#1890ff',
                    miniContentHeight: 10,
                    monthControlWidth: 60,
                    yearControlWidth: 50,
                  },
                },
              }}
              locale={tr_TR as any}
            >
              { (calendarData) ? (
                <div className="calendar-container">
                  <Calendar
                    cellRender={cellRender}
                    fullscreen={false}
                    className="custom-calendar"
                    onSelect={onSelect}
                    onPanelChange={onPanelChange}
                    //locale={tr_TR}
                  />
                </div>
              ) : (
                <div className="custom-calendar-loading">
                  Loading...
                </div>
              )}
            </ConfigProvider>
            <Flex
              vertical
              align="center"
              justify="center"
              style={{
                padding: 50
              }}>
              <Typography.Title level={1}>
                { (mode === 'month') ? date.format('DD MMMM YYYY') : date.format('MMMM YYYY') }
              </Typography.Title>
              <List
                itemLayout="horizontal"
                dataSource={
                  (mode === 'month') ?
                  filteredData.filter((item) => item?.date === date.format('YYYY-MM-DD')) :
                  filteredData.filter((item) => dayjs(item?.date).format('YYYY-MM') === (date.format('YYYY-MM')))
                }
                locale={{ emptyText: 'Tatil Bulunamadı', }}
                renderItem={(item, index) => (
                  <List.Item>
                    <Checkbox
                      checked={download.includes(item)}
                      onChange={(e) => {
                        if(e.target.checked) {
                          setDownload([...download, item]);
                        } else {
                          setDownload(download.filter((i) => i !== item));
                        }
                      }}
                    >
                      <Badge color={item?.color} text={`${item?.name} - ${item?.location}`} />
                    </Checkbox>
                  </List.Item>
                )}
              />
            </Flex>
          </Flex>
        </Card>
        <ToastContainer />
    </div>
  )
}
