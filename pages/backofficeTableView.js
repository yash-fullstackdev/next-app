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
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import styles from "../styles/userDataResPage.module.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#f50057",
    },
    background: {
      default: "#f4f6f8",
      paper: "#fff",
    },
    text: {
      primary: "#333",
      secondary: "#888",
    },
  },
  typography: {
    h6: {
      fontSize: "1.1rem",
      fontWeight: 600,
    },
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

export default function UserDataResPage() {
  const router = useRouter();
  const { userDataRes } = router.query;
  const [parsedUserDataRes, setParsedUserDataRes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (userDataRes) {
      try {
        const parsedData = JSON.parse(userDataRes);
        setParsedUserDataRes(parsedData);
      } catch (error) {
        setError("Error parsing customer data");
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, [userDataRes]);

  if (loading) return <LoadingIndicator />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <ThemeProvider theme={theme}>
      <Box
        className={styles.pageContainer}
        sx={{ padding: 3, backgroundColor: theme.palette.background.default }}
      >
        <Typography variant="h4" color="primary" gutterBottom>
          Backoffice Data
        </Typography>
        <TableContainer component={Paper} className={styles.tableContainer}>
          <Table className={styles.table}>
            <TableHead>
              <TableRow>
                <TableCell>WalletUID</TableCell>
                <TableCell>WalletUserUID</TableCell>
                <TableCell>WalletAddress</TableCell>
                <TableCell>WalletType</TableCell>
                <TableCell>WalletCryptoSchema</TableCell>
                <TableCell>WalletCreatedAt</TableCell>
                <TableCell>WalletUpdatedAt</TableCell>
                <TableCell>UserUID</TableCell>
                <TableCell>UserEmail</TableCell>
                <TableCell>UserName</TableCell>
                <TableCell>UserCreatedAt</TableCell>
                <TableCell>UserUpdatedAt</TableCell>
                <TableCell>TransactionHash</TableCell>
                <TableCell>TransactionUserUID</TableCell>
                <TableCell>TransactionWalletUID</TableCell>
                <TableCell>TransactionTo</TableCell>
                <TableCell>TransactionFrom</TableCell>
                <TableCell>TransactionValue</TableCell>
                <TableCell>TransactionStatus</TableCell>
                <TableCell>TransactionDirection</TableCell>
                <TableCell>TransactionCreatedAt</TableCell>
                <TableCell>TransactionUpdatedAt</TableCell>
                <TableCell>StreamUID</TableCell>
                <TableCell>StreamMoralisID</TableCell>
                <TableCell>StreamDescription</TableCell>
                <TableCell>StreamTag</TableCell>
                <TableCell>StreamChains</TableCell>
                <TableCell>StreamCreatedAt</TableCell>
                <TableCell>StreamUpdatedAt</TableCell>
                <TableCell>RecoveryKeyUserUID</TableCell>
                <TableCell>RecoveryKeyCredentialID</TableCell>
                <TableCell>RecoveryKeyCreatedAt</TableCell>
                <TableCell>RecoveryKeyUpdatedAt</TableCell>
                <TableCell>QueueJobTxHash</TableCell>
                <TableCell>QueueJobUserUID</TableCell>
                <TableCell>QueueJobCreatedAt</TableCell>
                <TableCell>QueueJobUpdatedAt</TableCell>
                <TableCell>PendingTransactionHash</TableCell>
                <TableCell>PendingTransactionUserUID</TableCell>
                <TableCell>PendingTransactionCreatedAt</TableCell>
                <TableCell>PendingTransactionUpdatedAt</TableCell>
                <TableCell>NameAddressUID</TableCell>
                <TableCell>NameAddressUserUID</TableCell>
                <TableCell>NameAddressName</TableCell>
                <TableCell>NameAddressAddress</TableCell>
                <TableCell>NameAddressCreatedAt</TableCell>
                <TableCell>NameAddressUpdatedAt</TableCell>
                <TableCell>MigrationName</TableCell>
                <TableCell>MigrationCreatedAt</TableCell>
                <TableCell>MigrationUpdatedAt</TableCell>
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
