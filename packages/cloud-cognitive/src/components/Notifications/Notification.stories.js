/**
 * Copyright IBM Corp. 2020, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import { Button } from 'carbon-components-react';
import {
  Header,
  HeaderContainer,
  HeaderName,
  HeaderGlobalBar,
  HeaderGlobalAction,
} from 'carbon-components-react/lib/components/UIShell';
import { User20, Notification20 } from '@carbon/icons-react';
import { white } from '@carbon/colors';
import styles from './_storybook-styles.scss';
import { pkg } from '../../settings';
import uuidv4 from '../../global/js/utils/uuidv4';
import '../../enable-all'; // must come before component is imported (directly or indirectly)
import { Notifications } from '.';

import { getStorybookPrefix } from '../../../config';
const storybookPrefix = getStorybookPrefix(pkg, Notifications.displayName);

import mdx from './Notifications.mdx';
import data from './Notifications_data';

export default {
  title: `${storybookPrefix}/${Notifications.displayName}`,
  component: Notifications,
  parameters: {
    styles,
    docs: {
      page: mdx,
    },
  },
};

const renderUIShellHeader = (open, setOpen) => (
  <HeaderContainer
    render={() => (
      <Header aria-label="IBM Cloud Pak">
        <HeaderName href="/" prefix="IBM">
          Cloud Pak
        </HeaderName>
        <HeaderGlobalBar
          style={{
            zIndex: 2,
          }}>
          <HeaderGlobalAction
            aria-label="App switcher"
            onClick={() => setOpen(!open)}>
            <Notification20
              style={{
                fill: white,
              }}
            />
          </HeaderGlobalAction>
          <HeaderGlobalAction aria-label="App switcher">
            <User20
              style={{
                fill: white,
              }}
            />
          </HeaderGlobalAction>
        </HeaderGlobalBar>
      </Header>
    )}
  />
);

const Template = (args) => {
  const [open, setOpen] = useState(false);
  const [notificationsData, setNotificationsData] = useState(data);

  const addNewNotification = () => {
    const newNotification = {
      id: uuidv4(),
      type: 'success',
      title: 'Deployed app successfully',
      description: 'Application has been deployed.',
      timestamp: new Date(),
      unread: true,
      onNotificationClick: action(`Clicked on notification`),
    };
    setNotificationsData((arr) => [...arr, newNotification]);
  };

  return (
    <>
      {renderUIShellHeader(open, setOpen)}
      <Button onClick={addNewNotification}>Add new notification</Button>
      <Notifications
        {...args}
        data={notificationsData}
        open={open}
        setOpen={setOpen}
      />
    </>
  );
};

const EmptyNotifications = (args) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      {renderUIShellHeader(open, setOpen)}
      <Notifications {...args} open={open} setOpen={setOpen} />
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  onDoNotDisturbChange: action('Toggled to do not disturb'),
  onViewAllClick: action('Clicked view all button'),
  onSettingsClick: action('Cliked settings gear'),
  onDismissAllNotifications: action('Dismiss all notifications action'),
  onDismissSingleNotification: action('Dismiss single notification'),
};

export const EmptyState = EmptyNotifications.bind({});
EmptyState.args = {
  data: [],
  onDoNotDisturbChange: action('Toggled to do not disturb'),
  onViewAllClick: action('Clicked view all button'),
  onSettingsClick: action('Clicked settings gear'),
};