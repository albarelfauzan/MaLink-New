import React from 'react';
import { Modal, Box, Typography, Table, TableHead, TableRow, TableCell, TableBody, Button } from '@mui/material';

interface GroupRecipient {
  address: string;
  amount: string;
}

interface DetailModalProps {
  open: boolean;
  onClose: () => void;
  details: GroupRecipient[];
}

const DetailModal = ({ open, onClose, details }: DetailModalProps) => (
  <Modal open={open} onClose={onClose}>
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: '#261E35',
        borderRadius: 3,
        boxShadow: 24,
        p: 4,
        maxWidth: 600,
        width: '100%',
        color: '#fff',
      }}
    >
      <Typography variant="h6" mb={2} sx={{ color: '#AC6AEC' }}>
        Group Recipients
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: '#A0AEC0' }}>Address</TableCell>
            <TableCell sx={{ color: '#A0AEC0' }}>Amount (USDT)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {details.length > 0 ? (
            details.map((detail, index) => (
              <TableRow key={index}>
                <TableCell sx={{ color: '#fff' }}>{detail.address}</TableCell>
                <TableCell sx={{ color: '#fff' }}>{detail.amount}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={2} sx={{ color: '#fff' }}>No recipients found</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Box mt={3} textAlign="right">
        <Button
          variant="contained"
          sx={{ bgcolor: '#AC6AEC', color: '#fff', textTransform: 'none' }}
          onClick={onClose}
        >
          Close
        </Button>
      </Box>
    </Box>
  </Modal>
);

export default DetailModal;
