import React from 'react';
import OnyxTabNavigator, {TopTab} from '../libs/Navigation/OnyxTabNavigator';
import TabSelector from '../components/TabSelector/TabSelector';
import Navigation from '../libs/Navigation/Navigation';
import Permissions from '../libs/Permissions';
import NewChatPage from './NewChatPage';
import WorkspaceNewRoomPage from './workspace/WorkspaceNewRoomPage';
import CONST from '../CONST';
import withWindowDimensions, {windowDimensionsPropTypes} from '../components/withWindowDimensions';
import HeaderWithBackButton from '../components/HeaderWithBackButton';
import ScreenWrapper from '../components/ScreenWrapper';
import withLocalize, {withLocalizePropTypes} from '../components/withLocalize';
import compose from '../libs/compose';

const propTypes = {
    ...windowDimensionsPropTypes,

    ...withLocalizePropTypes,
};

const defaultProps = {
    betas: [],
    personalDetails: {},
    reports: {},
};

function NewChatSelectorPage(props) {
    return (
        <ScreenWrapper
            shouldEnableKeyboardAvoidingView={false}
            includeSafeAreaPaddingBottom={false}
            shouldEnableMaxHeight
        >
            <HeaderWithBackButton
                title={props.translate('sidebarScreen.fabNewChat')}
                onBackButtonPress={Navigation.dismissModal}
            />
            {Permissions.canUsePolicyRooms(props.betas) ? (
                <OnyxTabNavigator
                    id={CONST.TAB.NEW_CHAT_TAB_ID}
                    tabBar={({state, navigation, position}) => (
                        <TabSelector
                            state={state}
                            navigation={navigation}
                            position={position}
                        />
                    )}
                >
                    <TopTab.Screen
                        name={CONST.TAB.NEW_CHAT}
                        component={NewChatPage}
                    />
                    <TopTab.Screen
                        name={CONST.TAB.NEW_ROOM}
                        component={WorkspaceNewRoomPage}
                    />
                </OnyxTabNavigator>
            ) : (
                <NewChatPage />
            )}
        </ScreenWrapper>
    );
}

NewChatSelectorPage.propTypes = propTypes;
NewChatSelectorPage.defaultProps = defaultProps;
NewChatSelectorPage.displayName = 'NewChatPage';

export default compose(withLocalize, withWindowDimensions)(NewChatSelectorPage);
