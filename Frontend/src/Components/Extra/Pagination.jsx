import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Center, Button, Stack } from '@chakra-ui/react';

const PaginationBox = ({ total, setpage, page }) => {
  const Pages = Math.ceil(total / 25);
  const HandleLeft = () => {
    if (page === 1) return;
    setpage(prev => prev - 1);
  };
  const HandleRight = () => {
    if (page === Pages) return;
    setpage(prev => prev + 1);
  };
  return (
    <Stack mt="12px" alignItems={'center'} justifyContent={'center'}>
      <Center gap={{ md: '6px' }} py={1} px={2} width={'fit-content'} borderRadius={'5px'}>
        <Button variant={'unstyled'} mx={2} my={1} size="sm" display={{ base: 'none', md: 'flex' }}>
          Total Pages: {Pages}
        </Button>

        <Button variant={'solid'} onClick={HandleLeft} leftIcon={<ChevronLeftIcon />} size="sm">
          Prev
        </Button>
        <Button variant={'ghost'} background={'gray.300'} size="sm">
          {page}
        </Button>
        <Button variant={'solid'} onClick={HandleRight} rightIcon={<ChevronRightIcon />} size="sm">
          Next
        </Button>
        <Button size="sm" variant="outline" onClick={() => setpage(1)} display={{ base: 'none', md: 'flex' }}>
          First
        </Button>
        <Button size="sm" variant="outline" onClick={() => setpage(Pages)} display={{ base: 'none', md: 'flex' }}>
          Last
        </Button>
      </Center>
    </Stack>
  );
};

export default PaginationBox;
