export function styleDate(dateString, callback) {
  let date = new Date(dateString);
  let cleanDate = {
    day: '0',
    dayOfWeek: 'Sun',
    month: 'Jan',
    year: '2000'
  }

  switch(date.getMonth()) {
    case 0:
      cleanDate.month = 'Jan';
      break;
    case 1:
      cleanDate.month = 'Feb';
      break;
    case 2:
      cleanDate.month = 'Mar';
      break;
    case 3:
      cleanDate.month = 'Apr';
      break;
    case 4:
      cleanDate.month = 'May';
      break;
    case 5:
      cleanDate.month = 'Jun';
      break;
    case 6:
      cleanDate.month = 'Jul';
      break;
    case 7:
      cleanDate.month = 'Aug';
      break;
    case 8:
      cleanDate.month = 'Sep';
      break;
    case 9:
      cleanDate.month = 'Oct';
      break;
    case 10:
      cleanDate.month = 'Nov';
      break;
    case 11:
      cleanDate.month = 'Dec';
      break;
    default:
      cleanDate.month = 'Jan';
      break;
  }

  switch(date.getDay()) {
    case 0:
      cleanDate.dayOfWeek = 'Sun';
      break;
    case 1:
      cleanDate.dayOfWeek = 'Mon';
      break;
    case 2:
      cleanDate.dayOfWeek = 'Tue';
      break;
    case 3:
      cleanDate.dayOfWeek = 'Wed';
      break;
    case 4:
      cleanDate.dayOfWeek = 'Thu';
      break;
    case 5:
      cleanDate.dayOfWeek = 'Fri';
      break;
    case 6:
      cleanDate.dayOfWeek = 'Sat';
      break;
  }

  cleanDate.day = date.getDate();
  cleanDate.year = date.getFullYear();
  let cleanDateString = cleanDate.dayOfWeek + ' ' + cleanDate.day + ' ' + cleanDate.month + ' ' + cleanDate.year;
  callback(cleanDateString);
}

import { Share, Platform } from 'react-native';
export async function onShare(message) {
  try {
    const result = await Share.share({
      message: message,
      title: ''
    }, {
      subject: ''
    });

    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error) {
    alert(error.message);
  }
}
