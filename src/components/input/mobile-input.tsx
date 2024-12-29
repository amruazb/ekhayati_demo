'use client'
import { Input } from "@nextui-org/input";
import { Autocomplete, AutocompleteItem, Select, SelectItem } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import * as countries from 'countries-list';

function getFlags($code: string){
  if($code == 'AD') return '🇦🇩';
  if($code == 'AE') return '🇦🇪';
  if($code == 'AF') return '🇦🇫';
  if($code == 'AG') return '🇦🇬';
  if($code == 'AI') return '🇦🇮';
  if($code == 'AL') return '🇦🇱';
  if($code == 'AM') return '🇦🇲';
  if($code == 'AO') return '🇦🇴';
  if($code == 'AQ') return '🇦🇶';
  if($code == 'AR') return '🇦🇷';
  if($code == 'AS') return '🇦🇸';
  if($code == 'AT') return '🇦🇹';
  if($code == 'AU') return '🇦🇺';
  if($code == 'AW') return '🇦🇼';
  if($code == 'AX') return '🇦🇽';
  if($code == 'AZ') return '🇦🇿';
  if($code == 'BA') return '🇧🇦';
  if($code == 'BB') return '🇧🇧';
  if($code == 'BD') return '🇧🇩';
  if($code == 'BE') return '🇧🇪';
  if($code == 'BF') return '🇧🇫';
  if($code == 'BG') return '🇧🇬';
  if($code == 'BH') return '🇧🇭';
  if($code == 'BI') return '🇧🇮';
  if($code == 'BJ') return '🇧🇯';
  if($code == 'BL') return '🇧🇱';
  if($code == 'BM') return '🇧🇲';
  if($code == 'BN') return '🇧🇳';
  if($code == 'BO') return '🇧🇴';
  if($code == 'BQ') return '🇧🇶';
  if($code == 'BR') return '🇧🇷';
  if($code == 'BS') return '🇧🇸';
  if($code == 'BT') return '🇧🇹';
  if($code == 'BV') return '🇧🇻';
  if($code == 'BW') return '🇧🇼';
  if($code == 'BY') return '🇧🇾';
  if($code == 'BZ') return '🇧🇿';
  if($code == 'CA') return '🇨🇦';
  if($code == 'CC') return '🇨🇨';
  if($code == 'CD') return '🇨🇩';
  if($code == 'CF') return '🇨🇫';
  if($code == 'CG') return '🇨🇬';
  if($code == 'CH') return '🇨🇭';
  if($code == 'CI') return '🇨🇮';
  if($code == 'CK') return '🇨🇰';
  if($code == 'CL') return '🇨🇱';
  if($code == 'CM') return '🇨🇲';
  if($code == 'CN') return '🇨🇳';
  if($code == 'CO') return '🇨🇴';
  if($code == 'CR') return '🇨🇷';
  if($code == 'CU') return '🇨🇺';
  if($code == 'CV') return '🇨🇻';
  if($code == 'CW') return '🇨🇼';
  if($code == 'CX') return '🇨🇽';
  if($code == 'CY') return '🇨🇾';
  if($code == 'CZ') return '🇨🇿';
  if($code == 'DE') return '🇩🇪';
  if($code == 'DJ') return '🇩🇯';
  if($code == 'DK') return '🇩🇰';
  if($code == 'DM') return '🇩🇲';
  if($code == 'DO') return '🇩🇴';
  if($code == 'DZ') return '🇩🇿';
  if($code == 'EC') return '🇪🇨';
  if($code == 'EE') return '🇪🇪';
  if($code == 'EG') return '🇪🇬';
  if($code == 'EH') return '🇪🇭';
  if($code == 'ER') return '🇪🇷';
  if($code == 'ES') return '🇪🇸';
  if($code == 'ET') return '🇪🇹';
  if($code == 'FI') return '🇫🇮';
  if($code == 'FJ') return '🇫🇯';
  if($code == 'FK') return '🇫🇰';
  if($code == 'FM') return '🇫🇲';
  if($code == 'FO') return '🇫🇴';
  if($code == 'FR') return '🇫🇷';
  if($code == 'GA') return '🇬🇦';
  if($code == 'GB') return '🇬🇧';
  if($code == 'GD') return '🇬🇩';
  if($code == 'GE') return '🇬🇪';
  if($code == 'GF') return '🇬🇫';
  if($code == 'GG') return '🇬🇬';
  if($code == 'GH') return '🇬🇭';
  if($code == 'GI') return '🇬🇮';
  if($code == 'GL') return '🇬🇱';
  if($code == 'GM') return '🇬🇲';
  if($code == 'GN') return '🇬🇳';
  if($code == 'GP') return '🇬🇵';
  if($code == 'GQ') return '🇬🇶';
  if($code == 'GR') return '🇬🇷';
  if($code == 'GS') return '🇬🇸';
  if($code == 'GT') return '🇬🇹';
  if($code == 'GU') return '🇬🇺';
  if($code == 'GW') return '🇬🇼';
  if($code == 'GY') return '🇬🇾';
  if($code == 'HK') return '🇭🇰';
  if($code == 'HM') return '🇭🇲';
  if($code == 'HN') return '🇭🇳';
  if($code == 'HR') return '🇭🇷';
  if($code == 'HT') return '🇭🇹';
  if($code == 'HU') return '🇭🇺';
  if($code == 'ID') return '🇮🇩';
  if($code == 'IE') return '🇮🇪';
  if($code == 'IL') return '🇮🇱';
  if($code == 'IM') return '🇮🇲';
  if($code == 'IN') return '🇮🇳';
  if($code == 'IO') return '🇮🇴';
  if($code == 'IQ') return '🇮🇶';
  if($code == 'IR') return '🇮🇷';
  if($code == 'IS') return '🇮🇸';
  if($code == 'IT') return '🇮🇹';
  if($code == 'JE') return '🇯🇪';
  if($code == 'JM') return '🇯🇲';
  if($code == 'JO') return '🇯🇴';
  if($code == 'JP') return '🇯🇵';
  if($code == 'KE') return '🇰🇪';
  if($code == 'KG') return '🇰🇬';
  if($code == 'KH') return '🇰🇭';
  if($code == 'KI') return '🇰🇮';
  if($code == 'KM') return '🇰🇲';
  if($code == 'KN') return '🇰🇳';
  if($code == 'KP') return '🇰🇵';
  if($code == 'KR') return '🇰🇷';
  if($code == 'KW') return '🇰🇼';
  if($code == 'KY') return '🇰🇾';
  if($code == 'KZ') return '🇰🇿';
  if($code == 'LA') return '🇱🇦';
  if($code == 'LB') return '🇱🇧';
  if($code == 'LC') return '🇱🇨';
  if($code == 'LI') return '🇱🇮';
  if($code == 'LK') return '🇱🇰';
  if($code == 'LR') return '🇱🇷';
  if($code == 'LS') return '🇱🇸';
  if($code == 'LT') return '🇱🇹';
  if($code == 'LU') return '🇱🇺';
  if($code == 'LV') return '🇱🇻';
  if($code == 'LY') return '🇱🇾';
  if($code == 'MA') return '🇲🇦';
  if($code == 'MC') return '🇲🇨';
  if($code == 'MD') return '🇲🇩';
  if($code == 'ME') return '🇲🇪';
  if($code == 'MF') return '🇲🇫';
  if($code == 'MG') return '🇲🇬';
  if($code == 'MH') return '🇲🇭';
  if($code == 'MK') return '🇲🇰';
  if($code == 'ML') return '🇲🇱';
  if($code == 'MM') return '🇲🇲';
  if($code == 'MN') return '🇲🇳';
  if($code == 'MO') return '🇲🇴';
  if($code == 'MP') return '🇲🇵';
  if($code == 'MQ') return '🇲🇶';
  if($code == 'MR') return '🇲🇷';
  if($code == 'MS') return '🇲🇸';
  if($code == 'MT') return '🇲🇹';
  if($code == 'MU') return '🇲🇺';
  if($code == 'MV') return '🇲🇻';
  if($code == 'MW') return '🇲🇼';
  if($code == 'MX') return '🇲🇽';
  if($code == 'MY') return '🇲🇾';
  if($code == 'MZ') return '🇲🇿';
  if($code == 'NA') return '🇳🇦';
  if($code == 'NC') return '🇳🇨';
  if($code == 'NE') return '🇳🇪';
  if($code == 'NF') return '🇳🇫';
  if($code == 'NG') return '🇳🇬';
  if($code == 'NI') return '🇳🇮';
  if($code == 'NL') return '🇳🇱';
  if($code == 'NO') return '🇳🇴';
  if($code == 'NP') return '🇳🇵';
  if($code == 'NR') return '🇳🇷';
  if($code == 'NU') return '🇳🇺';
  if($code == 'NZ') return '🇳🇿';
  if($code == 'OM') return '🇴🇲';
  if($code == 'PA') return '🇵🇦';
  if($code == 'PE') return '🇵🇪';
  if($code == 'PF') return '🇵🇫';
  if($code == 'PG') return '🇵🇬';
  if($code == 'PH') return '🇵🇭';
  if($code == 'PK') return '🇵🇰';
  if($code == 'PL') return '🇵🇱';
  if($code == 'PM') return '🇵🇲';
  if($code == 'PN') return '🇵🇳';
  if($code == 'PR') return '🇵🇷';
  if($code == 'PS') return '🇵🇸';
  if($code == 'PT') return '🇵🇹';
  if($code == 'PW') return '🇵🇼';
  if($code == 'PY') return '🇵🇾';
  if($code == 'QA') return '🇶🇦';
  if($code == 'RE') return '🇷🇪';
  if($code == 'RO') return '🇷🇴';
  if($code == 'RS') return '🇷🇸';
  if($code == 'RU') return '🇷🇺';
  if($code == 'RW') return '🇷🇼';
  if($code == 'SA') return '🇸🇦';
  if($code == 'SB') return '🇸🇧';
  if($code == 'SC') return '🇸🇨';
  if($code == 'SD') return '🇸🇩';
  if($code == 'SE') return '🇸🇪';
  if($code == 'SG') return '🇸🇬';
  if($code == 'SH') return '🇸🇭';
  if($code == 'SI') return '🇸🇮';
  if($code == 'SJ') return '🇸🇯';
  if($code == 'SK') return '🇸🇰';
  if($code == 'SL') return '🇸🇱';
  if($code == 'SM') return '🇸🇲';
  if($code == 'SN') return '🇸🇳';
  if($code == 'SO') return '🇸🇴';
  if($code == 'SR') return '🇸🇷';
  if($code == 'SS') return '🇸🇸';
  if($code == 'ST') return '🇸🇹';
  if($code == 'SV') return '🇸🇻';
  if($code == 'SX') return '🇸🇽';
  if($code == 'SY') return '🇸🇾';
  if($code == 'SZ') return '🇸🇿';
  if($code == 'TC') return '🇹🇨';
  if($code == 'TD') return '🇹🇩';
  if($code == 'TF') return '🇹🇫';
  if($code == 'TG') return '🇹🇬';
  if($code == 'TH') return '🇹🇭';
  if($code == 'TJ') return '🇹🇯';
  if($code == 'TK') return '🇹🇰';
  if($code == 'TL') return '🇹🇱';
  if($code == 'TM') return '🇹🇲';
  if($code == 'TN') return '🇹🇳';
  if($code == 'TO') return '🇹🇴';
  if($code == 'TR') return '🇹🇷';
  if($code == 'TT') return '🇹🇹';
  if($code == 'TV') return '🇹🇻';
  if($code == 'TW') return '🇹🇼';
  if($code == 'TZ') return '🇹🇿';
  if($code == 'UA') return '🇺🇦';
  if($code == 'UG') return '🇺🇬';
  if($code == 'UM') return '🇺🇲';
  if($code == 'US') return '🇺🇸';
  if($code == 'UY') return '🇺🇾';
  if($code == 'UZ') return '🇺🇿';
  if($code == 'VA') return '🇻🇦';
  if($code == 'VC') return '🇻🇨';
  if($code == 'VE') return '🇻🇪';
  if($code == 'VG') return '🇻🇬';
  if($code == 'VI') return '🇻🇮';
  if($code == 'VN') return '🇻🇳';
  if($code == 'VU') return '🇻🇺';
  if($code == 'WF') return '🇼🇫';
  if($code == 'WS') return '🇼🇸';
  if($code == 'XK') return '🇽🇰';
  if($code == 'YE') return '🇾🇪';
  if($code == 'YT') return '🇾🇹';
  if($code == 'ZA') return '🇿🇦';
  if($code == 'ZM') return '🇿🇲';
  return '🏳';
}

interface ThemeInputProps {
  value?: string;
  color?: string;
  label?: string;
  type?: "email" | "text" | "password" | "number";
  endItem?: any;
  placeholder?: string;
  className?: string;
  radius?: string;
  smaller?: boolean;
  classNames?: {
    inputWrapper?: string[];
    label?: string[];
  };
  errorMessage?: string;
  countryCodeErrorMessage?: string;
  countryCodeExtras?: any;
  countryCodeLabel?: string;
  extras?: any;
  onChange?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onKeyDown?: () => void;
  onKeyUp?: () => void;
  onEnter?: () => void;
  onClear?: () => void;
  onPaste?: () => void;
  onCountryChange?: (e?: any) => void;
  countryCodeValue?: string;
  control?: any
  onSelectionChange?: (e?: any) => void;
}

export const MobileInput = (props: ThemeInputProps) => {
  const [countryList, setCountryList] = useState<any[]>([]);
  const [countryLabels, setCountryLabels] = useState<any>({});

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    let a: any[] = [];
    const obj: any = {};
    countries.getCountryDataList().forEach((item: any) => {
      obj[`${countries.getEmojiFlag(item?.iso2)} +${item.phone?.[0]}`] = item?.name;
      a.push({ code: item?.phone?.[0], value: item?.iso2, label: item.name, flag: countries.getEmojiFlag(item?.iso2) })
    });
    setCountryList(a);
    setCountryLabels(obj);
  }

  const className = "bg-primary-800 rounded-xl xs:rounded-md focus:outline-none";
  const classnames = {
    inputWrapper: [
      "text-white border-primary-800",
      "bg-transparent active:bg-primary-800",
      "data-[hover=true]:bg-primary-800 data-[hover=true]:border-primary",
      "data-[focus=true]:bg-primary-800",
      "group[data-fucus=true]:bg-primary-800",
      "group-data-[focus=true]:bg-primary-800",
      "group-data-[hover=true]:bg-primary-800"
    ],
    label: [
      "text-white/50",
      "xs:text-[12px]",
    ],
    input: [
      "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
    ]
  };

  const myFilter = (textValue: any, inputValue: any) => {
    if (inputValue.length === 0) {
      return true;
    }
    
    const cnt = countryLabels[textValue];
    //remove space
    return cnt?.toLowerCase()?.includes(inputValue.toLowerCase());
    return true;
  };

  const a = () =>       <Select
  color="secondary"
  label={props.label}
  className={className + ` ${props?.smaller ? "col-span-3" : "col-span-1"}`}
  radius="lg"
  size="sm"
  classNames={classnames}
  variant="bordered"
  isInvalid={props?.countryCodeErrorMessage ? true : false}
  errorMessage={props?.countryCodeErrorMessage ? props?.countryCodeErrorMessage : ""}
  {...props?.countryCodeExtras}
  onChange={(e: any, a: any) => {
    if (props?.onCountryChange) {
      props?.onCountryChange(e?.target?.value?.replace(/\-[0-9].*/, ""));
    }
    e.target.value = e?.target?.value?.replace(/\-[0-9].*/, "");
    props?.countryCodeExtras?.onChange(e);
  }}
  defaultSelectedKeys={props?.countryCodeValue ? [props?.countryCodeValue] : null}
>
  {
    countryList?.map((item, index) => {
      return <SelectItem textValue={item.flag + " +" + item.code} value={item?.value} key={`${item?.value}`}>{item?.flag} {" +" + item.code}</SelectItem>
    })
  }
</Select>

  return (
    <div className={`grid ${props?.smaller ? "grid-cols-8" : "grid-cols-4"} gap-4 w-full`}>

      <input type="hidden" {...props?.countryCodeExtras} value={props?.countryCodeValue} />

      <Autocomplete
        color="secondary"
        label={props?.countryCodeLabel}
        className={className + ` ${props?.smaller ? "col-span-3" : "col-span-1"}`}
        radius="lg"
        size="sm"
        variant="bordered"
        //@ts-ignore
        classNames={classnames}
        defaultFilter={myFilter}
        value={props?.countryCodeValue}
        defaultSelectedKey={props?.countryCodeValue}
        isInvalid={props?.countryCodeErrorMessage ? true : false}
        errorMessage={props?.countryCodeErrorMessage ? props?.countryCodeErrorMessage : ""}

        onSelectionChange={(e: any) => {
          if (props?.onCountryChange) {
            props?.countryCodeExtras?.onChange({ target: { name: props.countryCodeExtras.name, value: !e ? e : countries?.getCountryData(e)?.phone[0] } });
            props?.onCountryChange(e);
          }
        }}

        // onInputChange={function(e: any){
        //   console.log("on input change: ", e);
        //   if (props?.onCountryChange) {
        //     props?.onCountryChange("AE");
        //   }
        //   props?.countryCodeExtras?.onChange({
        //     target: {
        //       name: "countryCode",
        //       value: e.match(/\+[0-9]+/)?.[0]
        //     }
        //   });
        // }}
      >
        {
          countryList?.map((item, index) => {
            return <AutocompleteItem textValue={getFlags(item.value) + " +" + item.code} value={item?.value} key={`${item?.value}`}>{getFlags(item.value)} {" +" + item.code}</AutocompleteItem>
          })
        }
      </Autocomplete>

      

      <Input
        color="secondary"
        label={props.label || "Mobile number"}
        type={"number"}
        size="sm"
        placeholder={props.placeholder}
        className={className + " col-span-5"}
        radius="lg"
        classNames={classnames}
        variant="bordered"
        isInvalid={props?.errorMessage ? true : false}
        errorMessage={props?.errorMessage}
        {...props?.extras}
        defaultValue={props?.value}
      />
    </div>
  );
}