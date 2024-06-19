import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Typography,
  Box,
  Button,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import styles from "../styles/userDataResPage.module.css";

const theme = createTheme({
  palette: {
    primary: { main: "#3f51b5" },
    secondary: { main: "#f50057" },
    background: { default: "#f4f6f8", paper: "#fff" },
    text: { primary: "#333", secondary: "#888" },
  },
  typography: {
    h6: { fontSize: "1.1rem", fontWeight: 600 },
  },
});

const LoadingIndicator = () => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
    }}
  >
    <CircularProgress />
  </Box>
);

const ErrorMessage = ({ error }) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
    }}
  >
    <Typography variant="h6" color="error">
      {error}
    </Typography>
  </Box>
);

export default function BackofficeTableView() {
  const router = useRouter();
  const [parsedUserDataRes, setParsedUserDataRes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const userUid = localStorage.getItem("userUid");
        if (!token || !userUid) {
          router.push("/login");
          return;
        }

        const apiUrl = "/api/backoffice-data";
        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            userUid: userUid,
          },
        });

        setParsedUserDataRes(response.data);
      } catch (error) {
        setError("Error fetching backoffice data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userUid");
    router.push("/login");
  };

  if (loading) return <LoadingIndicator />;
  if (error) return <ErrorMessage error={error} />;

  // Render table with fetched user data
  return (
    <ThemeProvider theme={theme}>
      <Box
        className={styles.pageContainer}
        sx={{ padding: 3, backgroundColor: theme.palette.background.default }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 3,
          }}
        >
          <Typography variant="h4" color="primary" gutterBottom>
            Backoffice Data
          </Typography>
          <Button variant="contained" color="secondary" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
        <TableContainer component={Paper} className={styles.tableContainer}>
          <Table className={styles.table}>
            <TableHead>
              <TableRow>
                {[
                  "WalletUID",
                  "WalletUserUID",
                  "WalletAddress",
                  "WalletType",
                  "WalletCryptoSchema",
                  "WalletCreatedAt",
                  "WalletUpdatedAt",
                  "UserUID",
                  "UserEmail",
                  "UserName",
                  "UserCreatedAt",
                  "UserUpdatedAt",
                  "TransactionHash",
                  "TransactionUserUID",
                  "TransactionWalletUID",
                  "TransactionTo",
                  "TransactionFrom",
                  "TransactionValue",
                  "TransactionStatus",
                  "TransactionDirection",
                  "TransactionCreatedAt",
                  "TransactionUpdatedAt",
                  "StreamUID",
                  "StreamMoralisID",
                  "StreamDescription",
                  "StreamTag",
                  "StreamChains",
                  "StreamCreatedAt",
                  "StreamUpdatedAt",
                  "RecoveryKeyUserUID",
                  "RecoveryKeyCredentialID",
                  "RecoveryKeyCreatedAt",
                  "RecoveryKeyUpdatedAt",
                  "QueueJobTxHash",
                  "QueueJobUserUID",
                  "QueueJobCreatedAt",
                  "QueueJobUpdatedAt",
                  "PendingTransactionHash",
                  "PendingTransactionUserUID",
                  "PendingTransactionCreatedAt",
                  "PendingTransactionUpdatedAt",
                  "NameAddressUID",
                  "NameAddressUserUID",
                  "NameAddressName",
                  "NameAddressAddress",
                  "NameAddressCreatedAt",
                  "NameAddressUpdatedAt",
                  "MigrationName",
                  "MigrationCreatedAt",
                  "MigrationUpdatedAt",
                ].map((header) => (
                  <TableCell key={header}>{header}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {parsedUserDataRes.map((userData, index) => (
                <TableRow key={index}>
                  <TableCell>{userData.WalletUID}</TableCell>
                  <TableCell>{userData.WalletUserUID}</TableCell>
                  <TableCell>{userData.WalletAddress}</TableCell>
                  <TableCell>{userData.WalletType}</TableCell>
                  <TableCell>{userData.WalletCryptoSchema}</TableCell>
                  <TableCell>{userData.WalletCreatedAt}</TableCell>
                  <TableCell>{userData.WalletUpdatedAt}</TableCell>
                  <TableCell>{userData.UserUID}</TableCell>
                  <TableCell>{userData.UserEmail}</TableCell>
                  <TableCell>{userData.UserName}</TableCell>
                  <TableCell>{userData.UserCreatedAt}</TableCell>
                  <TableCell>{userData.UserUpdatedAt}</TableCell>
                  <TableCell>{userData.TransactionHash}</TableCell>
                  <TableCell>{userData.TransactionUserUID}</TableCell>
                  <TableCell>{userData.TransactionWalletUID}</TableCell>
                  <TableCell>{userData.TransactionTo}</TableCell>
                  <TableCell>{userData.TransactionFrom}</TableCell>
                  <TableCell>{userData.TransactionValue}</TableCell>
                  <TableCell>{userData.TransactionStatus}</TableCell>
                  <TableCell>{userData.TransactionDirection}</TableCell>
                  <TableCell>{userData.TransactionCreatedAt}</TableCell>
                  <TableCell>{userData.TransactionUpdatedAt}</TableCell>
                  <TableCell>{userData.StreamUID}</TableCell>
                  <TableCell>{userData.StreamMoralisID}</TableCell>
                  <TableCell>{userData.StreamDescription}</TableCell>
                  <TableCell>{userData.StreamTag}</TableCell>
                  <TableCell>{userData.StreamChains}</TableCell>
                  <TableCell>{userData.StreamCreatedAt}</TableCell>
                  <TableCell>{userData.StreamUpdatedAt}</TableCell>
                  <TableCell>{userData.RecoveryKeyUserUID}</TableCell>
                  <TableCell>{userData.RecoveryKeyCredentialID}</TableCell>
                  <TableCell>{userData.RecoveryKeyCreatedAt}</TableCell>
                  <TableCell>{userData.RecoveryKeyUpdatedAt}</TableCell>
                  <TableCell>{userData.QueueJobTxHash}</TableCell>
                  <TableCell>{userData.QueueJobUserUID}</TableCell>
                  <TableCell>{userData.QueueJobCreatedAt}</TableCell>
                  <TableCell>{userData.QueueJobUpdatedAt}</TableCell>
                  <TableCell>{userData.PendingTransactionHash}</TableCell>
                  <TableCell>{userData.PendingTransactionUserUID}</TableCell>
                  <TableCell>{userData.PendingTransactionCreatedAt}</TableCell>
                  <TableCell>{userData.PendingTransactionUpdatedAt}</TableCell>
                  <TableCell>{userData.NameAddressUID}</TableCell>
                  <TableCell>{userData.NameAddressUserUID}</TableCell>
                  <TableCell>{userData.NameAddressName}</TableCell>
                  <TableCell>{userData.NameAddressAddress}</TableCell>
                  <TableCell>{userData.NameAddressCreatedAt}</TableCell>
                  <TableCell>{userData.NameAddressUpdatedAt}</TableCell>
                  <TableCell>{userData.MigrationName}</TableCell>
                  <TableCell>{userData.MigrationCreatedAt}</TableCell>
                  <TableCell>{userData.MigrationUpdatedAt}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </ThemeProvider>
  );
}
