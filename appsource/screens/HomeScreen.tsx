import {
  FlatList,
  ListRenderItem,
  TouchableOpacity,
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RPLContainer, RPLFontMediumBold } from '../commonStyles';
import RPLScreenHeader from '../components/RPLScreenHeader';
import {
  getAllProducts,
  getCategories,
  getProductsByCategory,
} from '../network/products';
import { PaginationRef, Product, RPLScreenName } from '../types';
import RPLText from '../components/RPLText';
import { moderateScale } from 'react-native-size-matters';
import assets from '../assets';
import RPLActivityIndicator from '../components/RPLActivityIndicator';
import RPLProductItemComponent from '../components/RPLProductItemComponent';

const HomeScreen = ({ navigation }: any) => {
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchProduct, setSearchproduct] = useState<string>('');

  const paginationRef = useRef<PaginationRef>({
    skip: 0,
    total: 0,
  });

  useEffect(() => {
    paginationRef.current = { skip: 0, total: 0 };
    const timer = setTimeout(() => {
      setProducts([]);
      getAllProductsFromAPI(searchProduct);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchProduct]);

  const getAllProductsFromAPI = useCallback(
    async (searchProductText: string) => {
      try {
        setLoading(true);
        const data = await getAllProducts(
          paginationRef.current.skip,
          searchProductText.toLocaleLowerCase(),
        );
        setProducts(prev => [...prev, ...data.products]);
        paginationRef.current.skip += data.limit;
        paginationRef.current.total = data.total;
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const getCategoriesFromAPI = useCallback(async () => {
    try {
      const data = await getCategories();
      setCategories(['All', ...data]);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getCategoriesFromAPI();
    getAllProductsFromAPI('');
  }, []);

  const handleCategoryPress = useCallback(
    async (category: string) => {
      if (category === selectedCategory) return;

      setSelectedCategory(category);
      setProducts([]);
      setLoading(true);

      try {
        if (category === 'All') {
          paginationRef.current = { skip: 0, total: 0 };
          const data = await getAllProducts(0, '');
          setProducts(data.products);
          paginationRef.current.skip = data.limit;
          paginationRef.current.total = data.total;
        } else {
          const data = await getProductsByCategory(category);
          setProducts(data.products);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
    [selectedCategory],
  );

  const handleLoadMore = useCallback(() => {
    const { total, skip } = paginationRef.current;

    if (loading) return;
    if (selectedCategory !== 'All') return;
    if (skip >= total) return;

    getAllProductsFromAPI(searchProduct);
  }, [loading, selectedCategory, getAllProductsFromAPI]);

  const renderCategories: ListRenderItem<string> = useCallback(
    ({ item }) => {
      const isSelected = selectedCategory === item;
      return (
        <TouchableOpacity
          onPress={() => handleCategoryPress(item)}
          style={[
            styles.categoryButton,
            isSelected && styles.categoryButtonSelected,
          ]}
        >
          <RPLText
            text={item}
            onPress={() => handleCategoryPress(item)}
            style={{
              ...styles.categoryText,
              color: isSelected ? assets.colors.white : '',
            }}
          />
        </TouchableOpacity>
      );
    },
    [selectedCategory, handleCategoryPress],
  );

  const handleItemPress = (item: Product) => {
    navigation.navigate(RPLScreenName.ProductDetail, {
      id: item.id,
      name: item.title,
    });
  };

  const renderProducts: ListRenderItem<Product> = useCallback(({ item }) => {
    return <RPLProductItemComponent item={item} onPress={handleItemPress} />;
  }, []);

  const listHeaderComponent = useMemo(
    () => (
      <>
        {!!searchProduct ? (
          <></>
        ) : (
          <FlatList
            data={categories}
            renderItem={renderCategories}
            keyExtractor={item => item}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryListContent}
          />
        )}
      </>
    ),
    [searchProduct, categories, renderCategories],
  );

  return (
    <>
      {loading && <RPLActivityIndicator />}
      <SafeAreaView style={RPLContainer}>
        <RPLScreenHeader
          homeScreen
          value={searchProduct}
          onChange={setSearchproduct}
        />
        {products && products.length ? (
          <FlatList
            data={products}
            renderItem={renderProducts}
            keyExtractor={item => item.id.toString()}
            numColumns={2}
            ListHeaderComponent={listHeaderComponent}
            columnWrapperStyle={styles.row}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
            style={{ flex: 1 }}
          />
        ) : (
          <View
            style={{
              ...RPLContainer,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <RPLText text={'No Products Found'} />
          </View>
        )}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  categoryListContent: {
    gap: moderateScale(10),
    paddingVertical: moderateScale(12),
  },
  categoryButton: {
    height: moderateScale(40),
    paddingHorizontal: moderateScale(12),
    justifyContent: 'center',
    borderWidth: 1,
    marginHorizontal: moderateScale(6),
    borderRadius: moderateScale(5),
    borderColor: assets.colors.blue,
    backgroundColor: assets.colors.white,
  },
  categoryButtonSelected: {
    backgroundColor: assets.colors.blue,
  },
  categoryText: {
    ...RPLFontMediumBold,
    color: assets.colors.blue,
  },

  imageWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    padding: moderateScale(12),
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: moderateScale(12),
  },
  productCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: moderateScale(12),
    padding: moderateScale(12),
    marginHorizontal: moderateScale(4),
    elevation: 3,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  productImage: {
    width: moderateScale(100),
    height: moderateScale(100),
    marginBottom: moderateScale(8),
  },
  productTitle: {
    ...RPLFontMediumBold,
  },
  ratingStyle: {
    width: 15,
    paddingLeft: 0,
  },
  priceText: {
    ...RPLFontMediumBold,
    color: assets.colors.blue,
  },
});

export default HomeScreen;
