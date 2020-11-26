import * as React from 'react';
import {
  AppBar,
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Theme,
  Toolbar,
} from '@material-ui/core';
import { useMeQuery } from 'src/graphql';
import { useSignOut } from 'src/hooks';
import {
  AddOutlined as AddOutlinedIcon,
  HomeOutlined as HomeOutlinedIcon,
  TopicOutlined as TopicOutlinedIcon,
  InfoOutlined as InfoOutlinedIcon,
} from '@material-ui/icons';
import { css, Global } from '@emotion/react';

export default function HomePage() {
  const signOut = useSignOut();

  const {} = useMeQuery({
    onError() {
      signOut();
    },
  });

  return (
    <>
      <Global
        styles={css`
          #__next {
            height: 100vh;
            display: flex;
          }
        `}
      />

      <Box
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        {(props) => (
          <AppBar position="fixed" {...props}>
            <Toolbar></Toolbar>
          </AppBar>
        )}
      </Box>

      <Box
        sx={{
          width: 240,
          height: '100%',
          '> div': {
            width: 240,
            paddingTop: (theme: Theme) => +theme.mixins.toolbar.minHeight + parseInt(theme.spacing(2)),
            paddingBottom: 2,
          },
        }}
      >
        {(props) => (
          <Drawer variant="permanent" {...props}>
            <List>
              <ListItem button>
                <ListItemIcon>
                  <HomeOutlinedIcon />
                </ListItemIcon>
                <ListItemText>Home</ListItemText>
              </ListItem>

              <ListItem button>
                <ListItemIcon>
                  <AddOutlinedIcon />
                </ListItemIcon>
                <ListItemText>Add a link</ListItemText>
              </ListItem>

              <Divider />

              <ListItem button>
                <ListItemIcon>
                  <TopicOutlinedIcon />
                </ListItemIcon>
                <ListItemText>Browse topics</ListItemText>
              </ListItem>

              <Divider />

              <ListItem button>
                <ListItemIcon>
                  <InfoOutlinedIcon />
                </ListItemIcon>
                <ListItemText>About</ListItemText>
              </ListItem>
            </List>
          </Drawer>
        )}
      </Box>

      <Container component="main">
        <Button>Hello World</Button>
      </Container>
    </>
  );
}
