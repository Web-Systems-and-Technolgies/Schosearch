import { useCallback, useMemo, useState } from "react";
import Head from "next/head";
import { subDays, subHours } from "date-fns";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { Box, Button, Container, Stack, SvgIcon, TextField, Typography } from "@mui/material";
import { useSelection } from "src/hooks/use-selection";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { CustomersTable } from "src/sections/user/users-table";
import { applyPagination } from "src/utils/apply-pagination";

const now = new Date();

const data = [
  {
    id: "5e8tyjt87ac47eed253091be10cb",
    avatar: "/assets/avatars/avatar-carson-darrin.png",
    createdAt: subDays(subHours(now, 7), 1).getTime(),
    email: "schosearch@info.com",
    name: "Sophia Yvonne",
  },
  {
    id: "5e887ac47eed2530tyj91be10cb",
    avatar: "/assets/clark.jpg",
    createdAt: subDays(subHours(now, 7), 1).getTime(),
    email: "schosearch@info.com",
    name: "Jie clark Terec",
  },
  {
    id: "5etyjty87ac47eed253091be10cb",
    avatar: "/assets/alyssa.jpg",
    createdAt: subDays(subHours(now, 7), 1).getTime(),
    email: "schosearch@info.com",
    name: "Alyssa Timbang",
  },
  {
    id: "5etyjtawdy87ac47eed253091be10cb",
    avatar: "/assets/jerome.jpg",
    createdAt: subDays(subHours(now, 7), 1).getTime(),
    email: "schosearch@info.com",
    name: "Jerome Lagria",
  },
  {
    id: "5e887ac47eetyjtd253091be10cb",
    avatar: "/assets/avatars/avatar-carson-darrin.png",
    createdAt: subDays(subHours(now, 7), 1).getTime(),
    email: "user@gmail.com",
    name: "User",
  },
  {
    id: "5e887ayjtyc47eed253091be10cb",
    avatar: "/assets/avatars/avatar-carson-darrin.png",
    createdAt: subDays(subHours(now, 7), 1).getTime(),
    email: "user@gmail.com",
    name: "User",
  },
  {
    id: "5e887ac4tytjj7eed253091be10cb",
    avatar: "/assets/avatars/avatar-carson-darrin.png",
    createdAt: subDays(subHours(now, 7), 1).getTime(),
    email: "user@gmail.com",
    name: "User",
  },
  {
    id: "5e887ac47edrdrged253091be10cb",
    avatar: "/assets/avatars/avatar-carson-darrin.png",
    createdAt: subDays(subHours(now, 7), 1).getTime(),
    email: "user@gmail.com",
    name: "User",
  },
  {
    id: "5e887ac47rgdrgeed253091be10cb",
    avatar: "/assets/avatars/avatar-carson-darrin.png",
    createdAt: subDays(subHours(now, 7), 1).getTime(),
    email: "user@gmail.com",
    name: "User",
  },
  {
    id: "5e88awdawdaw7ac47eed253091be10cb",
    avatar: "/assets/avatars/avatar-carson-darrin.png",
    createdAt: subDays(subHours(now, 7), 1).getTime(),
    email: "user@gmail.com",
    name: "User",
  },
  {
    id: "5e887ac47eeawdd253091be10cb",
    avatar: "/assets/avatars/avatar-carson-darrin.png",
    createdAt: subDays(subHours(now, 7), 1).getTime(),
    email: "user@gmail.com",
    name: "User",
  },
  {
    id: "5e887awdaac47eed253091be10cb",
    avatar: "/assets/avatars/avatar-carson-darrin.png",
    createdAt: subDays(subHours(now, 7), 1).getTime(),
    email: "user@gmail.com",
    name: "User",
  },
  {
    id: "5e887ac47awdeed253091be10cb",
    avatar: "/assets/avatars/avatar-carson-darrin.png",
    createdAt: subDays(subHours(now, 7), 1).getTime(),
    email: "user@gmail.com",
    name: "User",
  },
  {
    id: "5e887ac47eed253091awdawbe10cb",
    avatar: "/assets/avatars/avatar-carson-darrin.png",
    createdAt: subDays(subHours(now, 7), 1).getTime(),
    email: "schosearch@info.com",
    name: "User",
  },
  {
    id: "5e887ac47eed25awdawd3091be10cb",
    avatar: "/assets/avatars/avatar-carson-darrin.png",
    createdAt: subDays(subHours(now, 7), 1).getTime(),
    email: "schosearch@info.com",
    name: "User",
  },
];

const useUsers = (page, rowsPerPage, searchName) => {
  return useMemo(() => {
    let filteredData = data;
    if (searchName) {
      const searchQuery = searchName.toLowerCase();
      filteredData = data.filter((user) => user.name.toLowerCase().includes(searchQuery));
    }
    return applyPagination(filteredData, page, rowsPerPage);
  }, [page, rowsPerPage, searchName]);
};

const useUserIds = (users) => {
  return useMemo(() => {
    return users.map((user) => user.id);
  }, [users]);
};

const Page = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchName, setSearchName] = useState("");
  const users = useUsers(page, rowsPerPage, searchName);
  const usersIds = useUserIds(users);
  const usersSelection = useSelection(usersIds);

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);

  const handleSearch = useCallback((event) => {
    setSearchName(event.target.value);
    setPage(0); // Reset the page when searching
  }, []);

  const handleSelectAll = useCallback(() => {
    usersSelection.handleSelectAll(users.map((user) => user.id));
  }, [users, usersSelection.handleSelectAll]);

  const handleDeselectAll = useCallback(() => {
    usersSelection.handleDeselectAll();
  }, [usersSelection.handleDeselectAll]);

  const handleSelectOne = useCallback(
    (userId) => {
      usersSelection.handleSelectOne(userId);
    },
    [usersSelection.handleSelectOne]
  );

  const handleDeselectOne = useCallback(
    (userId) => {
      usersSelection.handleDeselectOne(userId);
    },
    [usersSelection.handleDeselectOne]
  );

  return (
    <>
      <Head>
        <title>Users | SchoSearch</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">Users</Typography>
                <Stack alignItems="center" direction="row" spacing={1}></Stack>
              </Stack>
              <div>
                <Button variant="contained">Delete</Button>
              </div>
            </Stack>
            <TextField
              label="Search by name"
              variant="outlined"
              value={searchName}
              onChange={handleSearch}
            />
            <CustomersTable
              count={data.length}
              items={users}
              onDeselectAll={handleDeselectAll}
              onDeselectOne={handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={handleSelectAll}
              onSelectOne={handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={usersSelection.selected}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
