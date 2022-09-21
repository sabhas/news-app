import { useState, useContext } from "react"
import {
  Box,
  AppBar,
  Toolbar,
  Button,
  Menu,
  MenuItem,
  Checkbox,
  IconButton,
  Typography,
} from "@mui/material"
import FormControlLabel from "@mui/material/FormControlLabel"
import { Menu as MenuIcon } from "@mui/icons-material"
import { AppContext } from "../context/appContext"
import { Countries, Categories } from "../utils/constants"
import { Country, Source } from "../types"

const Bar = () => {
  const {
    country,
    setCountry,
    category,
    setCategory,
    sources,
    selectedSources,
    setSelectedSources,
  } = useContext(AppContext)
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)
  const [anchorElCountry, setAnchorElCountry] = useState<null | HTMLElement>(
    null
  )
  const [anchorElCategory, setAnchorElCategory] = useState<null | HTMLElement>(
    null
  )
  const [anchorElSources, setAnchorElSources] = useState<null | HTMLElement>(
    null
  )

  const handleCountryChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    item: Country
  ) => {
    if (event.target.checked) setCountry(item)
    else setCountry(undefined)
  }

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    item: string
  ) => {
    if (event.target.checked) setCategory(item)
    else setCategory(undefined)
  }

  const handleSourceChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    item: Source
  ) => {
    if (event.target.checked) {
      setSelectedSources((prev) => [...prev, item])
    } else {
      const filtered = selectedSources.filter((source) => source.id !== item.id)
      setSelectedSources(filtered)
    }
  }

  const handleAllSourcesCheckbox = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.checked) setSelectedSources([...sources])
    else setSelectedSources([])
  }

  return (
    <>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar variant="dense">
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Typography variant="h4">News App</Typography>

            <Button
              size="large"
              onClick={(event) => setAnchorElCountry(event.currentTarget)}
              color="inherit"
            >
              Country
            </Button>
            <Button
              size="large"
              onClick={(event) => setAnchorElCategory(event.currentTarget)}
              color="inherit"
            >
              Category
            </Button>
            <Button
              size="large"
              onClick={(event) => setAnchorElSources(event.currentTarget)}
              color="inherit"
            >
              Sources
            </Button>
          </Box>

          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              onClick={(event) => setAnchorElNav(event.currentTarget)}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>

          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              justifyContent: "center",
            }}
          >
            <Typography variant="h4">News App</Typography>
          </Box>
        </Toolbar>
      </AppBar>
      <Menu
        id="menu-appbar"
        anchorEl={anchorElNav}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        open={!!anchorElNav}
        onClose={() => setAnchorElNav(null)}
        sx={{
          display: { xs: "block", md: "none" },
        }}
      >
        <MenuItem sx={{ justifyContent: "center" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={(event) => setAnchorElCountry(event.currentTarget)}
          >
            Countries
          </Button>
        </MenuItem>

        <MenuItem sx={{ justifyContent: "center" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={(event) => setAnchorElCategory(event.currentTarget)}
          >
            Category
          </Button>
        </MenuItem>

        <MenuItem sx={{ justifyContent: "center" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={(event) => setAnchorElSources(event.currentTarget)}
          >
            Sources
          </Button>
        </MenuItem>
      </Menu>
      <Menu
        id="menu-country"
        anchorEl={anchorElCountry}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        open={!!anchorElCountry}
        onClose={() => setAnchorElCountry(null)}
      >
        {Countries.map((_country) => (
          <MenuItem key={_country.id}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={country?.id === _country.id}
                  onChange={(event) => handleCountryChange(event, _country)}
                />
              }
              label={_country.name}
            />
          </MenuItem>
        ))}
      </Menu>
      <Menu
        id="menu-category"
        anchorEl={anchorElCategory}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        open={!!anchorElCategory}
        onClose={() => setAnchorElCategory(null)}
      >
        {Categories.map((_category) => (
          <MenuItem key={_category}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={category === _category}
                  onChange={(event) => handleCategoryChange(event, _category)}
                />
              }
              label={_category}
            />
          </MenuItem>
        ))}
      </Menu>
      <Menu
        id="menu-sources"
        anchorEl={anchorElSources}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        open={!!anchorElSources}
        onClose={() => setAnchorElSources(null)}
      >
        <MenuItem dense divider>
          <FormControlLabel
            control={
              <Checkbox
                checked={sources.every((source) =>
                  selectedSources.includes(source)
                )}
                onChange={handleAllSourcesCheckbox}
              />
            }
            label="Select All"
          />
        </MenuItem>
        {sources.map((source) => (
          <MenuItem key={source.id}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedSources.includes(source)}
                  onChange={(event) => handleSourceChange(event, source)}
                />
              }
              label={source.name}
            />
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}

export default Bar
